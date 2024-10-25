import React from "react";
import './Sensores.css';
import { useState } from "react";

// quando é uma função, precisa começar com letra maiúscula
function CarregarForm({ title, actionUrl }){
    const[fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : ''); // condicao ? se verdadeiro : se falso
    };

    return (
        <div className="secao-formulario">
            <h2>{title}</h2>
            <form method="POST" encType="multipart/form-data" action={actionUrl}>
                <div className="upload-arquivos">
                    <label htmlFor={`file_${title.toLowerCase()}`} id={`label_${title.toLowerCase()}`}>
                        {fileName ? `Arquivo selecionado: ${fileName}`: `Escolha o arquivo de ${title}`}
                    </label>
                    <input
                        type="file"
                        id={`file_${title.toLowerCase()}`}
                        name="file"
                        accept=".csv"
                        required
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                         />
                </div>
                <button type="submit">Enviar {title}</button>
            </form>
        </div>
    );
}

function App(){
    return(
        <div className="container-formulario">
            <div>
                <h1>Upload de Arquivos CSV</h1>
                <button className="crud">Fazer Alterações</button>
            </div>
            
            <CarregarForm title="Sensores" actionUrl="/upload_sensores"/>
            <CarregarForm title="Contador" actionUrl="/upload_contadores"/>
            <CarregarForm title="Luminosidade" actionUrl="/upload_luminosidade"/>
            <CarregarForm title="Temperatura" actionUrl="/upload_temperatura"/>
            <CarregarForm title="Umidade" actionUrl="/upload_umidade"/>
        </div>
    )
}

export default App;

