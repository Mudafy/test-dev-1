##Mock data
questions = [
    {"id": 0, "name" : "Gunner Pfeffer", "email" : "Ollie.Fritsch81@hotmail.com", "phone" : "024.006.0876", "message" : "Vitae sapiente necessitatibus molestias et in et et.", "broker" : 40},
    {"id": 1, "name" : "Annetta Osinski", "email" : "Dora.Donnelly51@yahoo.com", "phone" : "1-726-706-6562 x993", "message" : "Neque assumenda quos debitis est pariatur tenetur.", "broker" : 2},
    {"id": 2, "name" : "Ashlynn Kiehn", "email" : "Kurtis.Fadel20@yahoo.com", "phone" : "001-362-5275 x687", "message" : "Error blanditiis quasi quia voluptate omnis pariatur reiciendis soluta.", "broker" : 40},
    {"id": 3, "name" : "Leland Batz", "email" : "Betty.Davis63@gmail.com", "phone" : "1-838-940-1210 x8122", "message" : "Maiores inventore consequatur harum voluptatem quod et pariatur.", "broker" : 1},
]

def get_questions_by_broker(broker_id):
    return [question for question in questions if question['broker'] == broker_id]

def get_question_by_id(id, collection):
    result = [question for question in collection if question['id'] == id]
    return result[0] if len(result)>0 else None

def delete_question_by_value(question):
    return questions.remove(question)