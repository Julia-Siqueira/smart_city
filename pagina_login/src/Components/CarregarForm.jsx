import React, { useState } from "react";

function CarregarForm({ title, actionUrl }) {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    }
    

    // Atualiza o nome do arquivo selecionado
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileName(selectedFile ? selectedFile.name : '');
        setFile(selectedFile);
    };

    // Envia o arquivo via formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica se há um arquivo selecionado
        if (!file) {
            alert("Por favor, selecione um arquivo para enviar.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const token = getAuthToken();

        // Envia o arquivo para o servidor
        fetch(actionUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
            
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`Erro ao enviar o arquivo: ${response.statusText}`)
            }
            response.json();
        })
     
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert("Erro ao enviar arquivo.");
            }
        })
        .catch(err => {
            console.error('Erro ao enviar o arquivo:', err);
            alert('Erro ao enviar o arquivo');
        });
    };

    return (
        <div style={styles.secaoFormulario}>
            <h2 style={styles.h2}>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.uploadArquivos}>
                    <label
                        htmlFor={`file_${(title || '').toLowerCase()}`}
                        id={`label_${(title || '').toLowerCase()}`}
                        style={styles.label}
                    >
                        {fileName ? `Arquivo selecionado: ${fileName}` : `Escolha o arquivo de ${title || 'arquivo'}`}
                    </label>
                    {/* Input de arquivo escondido, mas acessível ao clicar na label */}
                    <input
                        type="file"
                        id={`file_${(title || '').toLowerCase()}`}
                        name="file"
                        accept=".csv"
                        required
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // Mantém o input oculto
                    />
                </div>
                <button type="submit" style={styles.button}>Enviar {title || 'arquivo'}</button>
            </form>
        </div>
    );
}

const styles = {
    secaoFormulario: {
        margin: "20px 10px",
        padding: "20px",
        border: "2px solid #ddd",
        borderRadius: "15px",
        backgroundColor: "#f9f9f9",
        maxWidth: "400px"
    },
    h2: {
        fontSize: "24px",
        marginBottom: "15px",
        color: "#333",
    },
    uploadArquivos: {
        textAlign: "center",
    },
    label: {
        display: "block",
        width: "80%",
        padding: "15px",
        margin: "0 auto",
        border: "2px solid #ddd",
        borderRadius: "20px",
        backgroundColor: "#f9f9f9",
        color: "#333",
        textAlign: "center",
        cursor: "pointer",
        transition: "border-color 0.3s ease, background-color 0.3s ease",
    },
    button: {
        background: "#6D9CBE",
        color: "#fff",
        border: "2px solid white",
        borderRadius: "25px",
        padding: "15px 40px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "20px",
        display: "inline-block",
        width: "80%",
        transition: "all 0.3s ease",
        fontFamily: "Lexend",
    }
};

export default CarregarForm;
