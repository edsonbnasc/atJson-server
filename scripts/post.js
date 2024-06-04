export async function cadastrarSerie(e){
    e.preventDefault();



//responsavel por cadastrar uma nova serie utilizando o metodo POST
// document.getElementById("btnCadastrar").addEventListener("click", async (e) => {
//     e.preventDefault();
    //endpoint da API()
    const url = "http://localhost:8082/series";

    //captura os dados que vem do formulario
    const dadosEnviadosApi = {
        // "id": null,
        "nomeSerie": document.getElementById("nomeSerie").value,
        "numTemporadas": document.getElementById("temporadas").value,
        "estudio": document.getElementById("produtora").value,
        "anoLancamento": document.getElementById("anoLancamento").value,
    }
    //envia os dados para a API
        const dadosFinais = JSON.stringify(dadosEnviadosApi);
try {
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: dadosFinais
    });

    window.location.reload();

    // document.getElementById("btnCadastrar").removeEventListener("click", arguments.calle)
} catch (error) {
    console.log(`Erro ao consumir a api no cadastro: ${error}`);    
}        
}

export async function atualizarSerie(e, id) {
    e.preventDefault();

    if (window.confirm("Você deseja atualizar a série?")) {
        //tratamento de exceções (api)
        try {
            const dadosEnviadosAtualizados = {
                "nomeSerie": document.getElementById("nomeSerie").value,
                "numTemporadas": document.getElementById("temporadas").value,
                "estudio": document.getElementById("produtora").value,
                "anoLancamento": document.getElementById("anoLancamento").value
            }

            const retorno = await fetch(`http://localhost:8082/series/${id}`, {
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dadosEnviadosAtualizados),
                method: "PUT"
            });

            if (retorno.ok) {
                alert("A série foi atualizada com sucesso!");
                window.location.reload();
            } else {
                alert(`Não foi possível atualizar a série ${retorno.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
