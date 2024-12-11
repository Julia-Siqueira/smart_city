import React, { act, useState } from "react";

function CarregarForm({ title, actionUrl }) {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    // Atualiza o nome do arquivo selecionado
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileName(selectedFile ? selectedFile.name : '');
        setFile(selectedFile);
    };

    // Envia o arquivo via formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se há um arquivo selecionado
        if (!file) {
            alert("Por favor, selecione um arquivo para enviar.");
            return;
        }
        const token = localStorage.getItem('authToken');
        if(!token){
            alert('Você está sem o token')
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try{
            const response = await fetch(actionUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if(!response.ok){
                throw new Error(`Erro ao enviar o arquivo: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            alert(data.message || 'Arquivo enviado!')
        }
        catch(error){
            console.error('Erro ao enviar o arquivo:', error);
            alert('Erro ao enviar o arquivo. Verifique os detalhes no console.')
        }
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
