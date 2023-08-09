from flask import Flask, render_template, request
app = Flask('stock_pricer')


@app.route('/')
def show_predict_stock_form():
    return render_template('ErrorPrediction.html')
@app.route('/results', methods=['POST'])
def results():
    form = request.form
    if request.method == 'POST':
        #write your function that loads the model
        model = get_model() #you can use pickle to load the trained model
        predicted_errors[] = model.predict(Input[])
        return render_template('resultsform.html',   predicted_price=predipredicted_errors[])
app.run("localhost", "9999", debug=False)