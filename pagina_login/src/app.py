from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Inicializa a aplicação Flask
app = Flask(__name__)
CORS(app)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/48727174816/Desktop/smart_city/db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de usuário
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(254), nullable=False)
    password = db.Column(db.String(128), nullable=False)

# Endpoint para login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({'success': True}), 200
    else:
        return jsonify({'success': False, 'message': 'Credenciais inválidas'}), 401

# Adiciona um usuário (exemplo) dentro do contexto da aplicação
with app.app_context():
    # Cria as tabelas, se não existirem
    db.create_all()  # Garante que as tabelas do banco de dados estejam criadas

    # Verifica se o usuário já existe antes de adicionar
    existing_user = User.query.filter_by(username='admin').first()
    if not existing_user:
        new_user = User(username='admin', email='juliarrsiqueira@gmail.com', password='1234')
        db.session.add(new_user)
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)
