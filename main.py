from flask import Flask,jsonify,render_template,request,redirect,session,Response
from tensorflow.keras.models import load_model
app = Flask(__name__)
app.secret_key = "secrets"
import secrets
import pyrebase
from werkzeug.utils import secure_filename
import numpy as np
import cv2
import os
from datetime import datetime
import numpy as np
import cv2
model = load_model(os.path.join('','MangoDetector-4.h5'))
import os
conss = {
            "apiKey": "AIzaSyAfGNRYMBoJkc2lNpBvC2ZlZFtV6cqWTEI",
            "authDomain": "fyp-project-cs06.firebaseapp.com",
            "databaseURL":"https://fyp-project-cs06-default-rtdb.firebaseio.com",
            "projectId": "fyp-project-cs06",
            "storageBucket": "fyp-project-cs06.appspot.com",
            "messagingSenderId": "463282028020",
            "appId": "1:463282028020:web:404b702857a860e1478da1",
            "serviceAccount":"key.json"
    }



firebase_ = pyrebase.initialize_app(conss)
auth = firebase_.auth()
database =firebase_.database()
storage = firebase_.storage()

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/login',methods=['POST','GET'])
def login():
    if('user' in session):
        return redirect("dashboard")
    if request.method == "POST":
        typeofform = request.form.get("typee")
        
        if  typeofform == "signup":
                email = request.form.get("email")
                password = request.form.get("_password")
                username = request.form.get("username")
                user = auth.create_user_with_email_and_password(email,password)
                data = {"username":username,"role":"",'farm':""}
                database.child("users").child(user["localId"]).set(data)
                return "Done"
                
        elif typeofform == "signin":
            email = request.form.get("username_")
            password = request.form.get("password_")
            user = auth.sign_in_with_email_and_password(email,password)
             
            session["user"] = user["localId"]
            username = database.child("users").child(user["localId"]).child("username").get().val()
            session["username"]  = username            
            return "{}".format(session["username"])
    else: 
        return render_template("login.html")
    
@app.route('/logout')
def logout():
    if("user" in session):
        session.pop("user")
        return redirect("/login")
    return redirect("/login")
@app.route('/dashboard')
def dashboard():
    if('user' in session):
        list_farms = list(database.child("farms_").get().val().keys())
        session["farm_keys"] = list_farms
        user_info = database.child("users").child(session["user"]).get().val()
        session["role"] = user_info.get("role")
        session["farm"] = user_info.get("farm")

        
        return render_template("dashboard.html")
    else:
        return render_template("login.html")
    

@app.route('/api/submit_form', methods=['POST'])
def submit_form():
    checkbox = request.form.get("checkbox")
    if checkbox == 'true':
        var1 = database.child("users").child(session["user"]).get().val()
        if var1.get("role") == "":
            random_key = secrets.token_hex(10)
            # print(random_key,request.form)

            database.child("users").child(session["user"]).update({"role":"admin","farm":str(random_key)+"_"+request.form.get("farm_name")})
            # database.child("users").child(session["user_id"]).child("farms").set({"farms":str(random_key)})
            database.child("farms_").update({random_key:{"admin":session["username"],"location":request.form.get("farm_address"),"province":request.form.get("province"),"workers":"","specie":request.form.get("specie"),"farm_name":request.form.get("farm_name"),"overview": {
            'Anthracnose':0, 'Bacterial Canker':0,'Black Soothy Mold':0, 'Gall Midge':0, 'apoderus_javanicus':0, 'dappula_tertia':0,'dialeuropora_decempuncta':0,'icerya_seychellarum':0,'mictis_longicornis':0, 'neomelicharia_sparsa':0,'normal':0
        }}})
            farm_var = database.get().val()
            database.update({"farms":int(farm_var.get("farms"))+1})
            return 'Farm created successfully!'
        else:
            random_key = secrets.token_hex(10)
            # print(random_key,request.form)

            database.child("users").child(session["user"]).update({"farm":var1.get("farm") + "@" + str(random_key)+"_"+request.form.get("farm_name")})
            # database.child("users").child(session["user_id"]).child("farms").set({"farms":str(random_key)})
            database.child("farms_").update({random_key:{"admin":session["username"],"location":request.form.get("farm_address"),"province":request.form.get("province"),"workers":"","specie":request.form.get("specie"),"farm_name":request.form.get("farm_name"),"overview": {
            'Anthracnose':0, 'Bacterial Canker':0,'Black Soothy Mold':0, 'Gall Midge':0, 'apoderus_javanicus':0, 'dappula_tertia':0,'dialeuropora_decempuncta':0,'icerya_seychellarum':0,'mictis_longicornis':0, 'neomelicharia_sparsa':0,'normal':0
        }}})
            farm_var = database.get().val()
            database.update({"farms":int(farm_var.get("farms"))+1})
            return 'Farm created successfully!'

        
    else: 
        var1 =  database.child("farms_").child(request.form.get("farm_key")).get().val()
        database.child("farms_").child(request.form.get("farm_key")).update({"specie":request.form.get("specie") +"_"+ var1.get("specie"),"workers":session["username"]+"_"+  var1.get("workers")})
        database.child("users").child(session["user"]).update({"role":"worker","farm":request.form.get("farm_key") +"_"+var1.get("farm_name")})
        
        # database.child("farms_").child(request.form.get("farm_key")).update({})
        return  'Added to the Farm!'
      
@app.route('/get_farm', methods=['POST'])
def get_farm():
    farm = database.child("farms_").child(request.form.get("key")).get().val()
    return {"name":farm.get("farm_name"),"location":farm.get("location"),"province":farm.get("province"),"workers":farm.get("workers"),"admin":farm.get("admin")}
    
@app.route('/Information')
def information():
    if('user' in session):
        return render_template("information.html")
    else:
        return render_template("login.html")



@app.route('/upload',methods=['POST','GET'])
def upload():
    if request.method == "POST":
        files = request.files.getlist('files[]')
        specie = request.form.get("specie_name")
        farm = request.form.get("farm")

        print(specie,farm)
    
        now = datetime.now()
        dt_string = now.strftime("%d-%m-%Y_%H-%M-%S-%p")
        overview = {
            'Anthracnose':0, 'Bacterial Canker':0,'Black Soothy Mold':0, 'Gall Midge':0, 'apoderus_javanicus':0, 'dappula_tertia':0,'dialeuropora_decempuncta':0,'icerya_seychellarum':0,'mictis_longicornis':0, 'neomelicharia_sparsa':0,'normal':0
        }

        dicfor  = ""
        for file in files:
            arr = np.frombuffer(file.read(),np.uint8)
            img = cv2.imdecode(arr,cv2.COLOR_BGR2BGR555)
            img = cv2.resize(img,(256,256))
            newPrediction = model.predict(np.expand_dims(img,0))
            img_dimensions = str(img.shape)
            disease_cure = ["Fungicides remain the most popular and most economical way to treat mangos for anthracnose. Treating mango trees before fruit develops and prior to fruit harvest is key to keeping the disease in check, and follow-up treatments after harvest further delay the onset of the disease.",
            # "The best way to control sooty mold fungi is using preventive method by eliminating their sugary food supply. Controlling sap-feeding insects on the foliage as well as ants that tend and protect them. General-purpose fungicide may be effective on killing fungi but not removing black color. Controlling ants by using barriers or insecticide baits is another control method. Pruning to remove most of the infested plant parts is helpful. If the tree is small, sooty mold can be washed off with a strong stream of water or soap and water.",
            "Regular inspection of orchards, sanitation, and seedling certification are recommended as preventive measures against the disease. Spray of copper-based fungicides has been found effective in controlling bacterial canker.",
            "The best way to control sooty mold fungi is using preventive method by eliminating their sugary food supply. Controlling sap-feeding insects on the foliage as well as ants that tend and protect them. General-purpose fungicide may be effective on killing fungi but not removing black color. Controlling ants by using barriers or insecticide baits is another control method. Pruning to remove most of the infested plant parts is helpful.",
            "Pesticides: Spraying of 0.05 percent fenitrothion, 0.045 percent dimethoate at bud burst stage of the inflorescence can be effective in controlling the pest. Foliar application of bifenthrin (70ml/100lit) mixed with water has also given satisfactory results. Sanitation: removing and destroying any heavily infested shoots, leaves, and fruits from the tree. Cultural practices: This can include removing any overgrown branches or leaves that create a humid environment that is conducive to the growth of the insects.",
            "Pesticides can be used to control the beetles on the tree.\n Sanitation: Proper sanitation of the orchard can help to reduce the population of the beetles. This includes removing and destroying any fallen fruit and debris from the tree, which can serve as a breeding ground for the beetles. Biological control: Using predators such as ladybugs, lacewing, and parasitic wasps can help to control the population of the beetles",
            "Pesticides: Insecticides can be applied to the trunk and branches of the tree to kill larvae and adult beetles. Cultural control: Keeping trees healthy by providing adequate water, fertilizer, and pruning can help to reduce the chances of infestation.",
            "Control of Dialeurodes infestation can be done through the use of pesticides and other control measures like using natural enemies of whitefly such as lady beetles, lacewings, and parasitic wasps."
            ,"insecticides such as horticultural oil, and insecticidal soap can be used for prevention. It was found that paraffin oil at 1.25% was the most effective insecticide"
            ,"Control measures include the use of pesticides, pruning and removing infested branches"
            ,"The disease can be controlled by removing infected plant parts, and by applying fungicides. Cultural practices such as proper pruning and irrigation can also help prevent the disease from spreading."
            ,"none"]
            disease_list = ['Anthracnose', 
            'Bacterial Canker',
            'Black Soothy Mold', 
            'Gall Midge', 
            'apoderus_javanicus', 
            'dappula_tertia',
            'dialeuropora_decempuncta',
            'icerya_seychellarum',
            'mictis_longicornis', 
            'neomelicharia_sparsa',
            'normal']
            print(newPrediction[0],"-_-_")
            newPrediction1 = max(newPrediction[0])
            index_pred =newPrediction[0].argmax()
            newPrediction1 = str(newPrediction1)
            print(index_pred)
            xx = disease_list[index_pred] + "@" + str(newPrediction1) + "@" +disease_cure[index_pred]
            x = secure_filename(file.filename)
            overview[disease_list[index_pred]] += 1
            print(x)
            print(xx)
            dicfor += x + "@" + xx + "+"
            file.seek(0)
            storage.child("farms").child(farm).child(specie+"!"+session["username"]+"!"+dt_string).child(x).put(file ,x)
            print("done")
        newdicfor = {
            specie+"@"+session["username"]+"@"+dt_string:dicfor
        }
        print(newdicfor)
        over = {
            "overview": str(overview)
        }

        speciename = specie + "1"
        # database.child("users").child(session["user"]).child(specie).update(newdicfor)
        # database.child("users").child(session["user"]).child(speciename).update(over)
        print(dicfor,"-----------")
        database.child("farms_").child(farm).update(over)
        database.child("farms_").child(farm).child("reports"). update(newdicfor)
        return dicfor
         
        # 
    return render_template("upload-page.html")

@app.route('/history')
def history():
    if("user" in session):


        return render_template("history.html")
    else:
        return redirect("/login")
    
@app.route('/reports_get',methods=['POST'])
def reports_get():
    report_lst = []
    reports = database.child("farms_").child(request.form.get("farm_key")).child("reports").get().val()
    print(reports)
    # reports = reports.items()
    # print(reports)
    for key, value in reports.items():
        # report_lst.append(key)
        # report_lst.append(value)
        report_lst.append({key:value})
    print(report_lst)
        # {"vall":reports[0],"report":reports[1]}
    return report_lst

if __name__ == "__main__":
    app.run()
