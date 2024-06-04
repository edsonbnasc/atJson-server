import { cadastrarSerie, atualizarSerie } from "./post.js";

//requisicao do type get para retornar os dados da API
async function getSeries() {
    const url = 'http://localhost:8082/series'

    const retorno = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const dados = await retorno.json();
    console.log(dados)

    dados.forEach(series => {

        const tr = document.createElement('tr');
        const div = document.createElement('div');

        const listSeries = document.getElementById('listaSeries')
        
        const tdNomeSerie = document.createElement('td');
        tdNomeSerie.textContent = series.nomeSerie;

        const tdNumTemp = document.createElement('td');
        tdNumTemp.textContent = series.numTemporadas;

        const tdAnoLancamento = document.createElement('td');
        tdAnoLancamento.textContent = series.anoLancamento;
        
        const tdProdutora = document.createElement('td');
        tdProdutora.textContent = series.estudio;

        const tdEdit = document.createElement('img')
        tdEdit.src = './assets/icons/pencil.svg'

        tdEdit.addEventListener('click',  () =>{
            const id = series.id;

            document.getElementById("nomeSerie").value = series.nomeSerie
            document.getElementById("temporadas").value = series.numTemporadas
            document.getElementById("anoLancamento").value = series.anoLancamento
            document.getElementById("produtora").value = series.estudio

            //remover o evento de cadatrar do botao cadastrar
            // document.getElementById("btnCadastrar").textContent = "Atualizar serie"
            const btnCadastrar = document.getElementById("btnCadastrar");
            btnCadastrar.removeEventListener("click", cadastrarSerie);

            const clone = btnCadastrar.cloneNode(true);
            btnCadastrar.replaceWith(clone);

            clone.addEventListener("click", (e) => atualizarSerie(e, id));

            clone.textContent = "Atualizar série";
        })
            

        //     if (window.confirm("Voce deseja atualizar a serie?")) {
        //         async function atualizarSerie() {
        //             try {
        //                 const dadosEnviadosAtualizados = {
        //                     "nomeSerie" : document.getElementById("nomeSerie").value,
        //                     "numTemporadas" : document.getElementById("temporadas").value,
        //                     "anoLancamento" : document.getElementById("anoLancamento").value,
        //                     "estudio" : document.getElementById("produtora").value
        //                 }

        //                 const retorno = fetch(`http://localhost:8082/serie/${id}`,{
        //                     headers:{
        //                         'Content-Type': 'application/json'
        //                     },
        //                     body: JSON.stringify(dadosEnviadosAtualizados),
        //                     method: 'PUT'
        //                 })

        //                 if (retorno.ok) {
        //                     alert("A serie foi atualizada com sucesso!")
        //                 } else {
        //                     alert(`Não foi possivel atualizar a serie ${(await retorno).status}`)
        //                 }
        //             } catch (error) {
        //                 // console.log(error);
        //             }
        //         }
        //     }
        // })

        const tdDelete = document.createElement('img')
        tdDelete.src = './assets/icons/trash.svg'

        //metodo delete da serie
        tdDelete.addEventListener('click', () =>{
            const id = series.id;
            const deletar = window.confirm("Deseja realmente deletar a serie ?")
            
            if (deletar) {
                fetch(`http://localhost:8082/series/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type' : 'application/json',
                    }
            })
        } else{
            alert("A série sera mantida")
        }   
        })

        //tabela que aparece no html
        tr.appendChild(tdNomeSerie)
        tr.appendChild(tdNumTemp)
        tr.appendChild(tdAnoLancamento)
        tr.appendChild(tdProdutora)
        tr.appendChild(div)
        div.appendChild(tdEdit)
        div.appendChild(tdDelete)

        listSeries.appendChild(tr)

    });
}

getSeries();

document.getElementById("btnCadastrar").addEventListener("click", cadastrarSerie);