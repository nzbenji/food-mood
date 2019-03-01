const request = require('supertest')

jest.mock('../../server/db/meals', () => ({
    userMeals: () => Promise.resolve([
            {
                "id": 1,
                "user_id": 1,
                "title": "spaget",
                "time": "2019-03-01 14:00:45"
            },
            {
                "id": 2,
                "user_id": 1,
                "title": "bread",
                "time": "2019-03-01 18:00:30"
            },
            {
                "id": 3,
                "user_id": 1,
                "title": "pizza",
                "time": "2019-03-01 20:00:10"
            }
    ]),
    latestMeal: () => Promise.resolve(
        {
            "id": 3,
            "user_id": 1,
            "title": "pizza",
            "time": "2019-03-01 20:00:10"
        }
    ),
    allMealMoods: () => Promise.resolve([
            {
                "id": 2,
                "emotion_id": 3,
                "meal_id": 2,
                "note": "This bread was gross",
                "time": "2019-03-01 18:00:30"
            }
        ])
}))

const server = require('../../server/server')

test('GET /', () => {
    return request(server)
      .get('/api/v1/meals/1')
      .expect(200)
      .then((res) => {
          const actual = res.body[0].id
        expect(actual).toBe(1)
      })
      .catch(err => expect(err).toBeNull())
    })

    test('GET /', () => {
        return request(server)
          .get('/api/v1/meals/mostRecent/1')
          .expect(200)
          .then((res) => {
              const actual = res.body.id
            expect(actual).toBe(3)
          })
          .catch(err => expect(err).toBeNull())
        })

        test('GET /', () => {
            return request(server)
              .get('/api/v1/meals/moods/2')
              .expect(200)
              .then((res) => {
                  const actual = res.body[0].note
                expect(actual).toBe("This bread was gross")
              })
              .catch(err => expect(err).toBeNull())
            })

