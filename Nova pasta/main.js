console.log("Entrou no main")

const defaultSort = "cidade"

function getHREF() {
	return decodeURIComponent(window.location.href)
}

function getSortType() {
	let stype = getHREF().split("?");
	try {
		return JSON.parse(`{${stype.pop()}}`).sortby
	} catch (error) {
		return defaultSort;
	}
}

function getSortedBy(data, parameter) {
	return data.sort((a,b) => {
		return a[parameter].localeCompare(b[parameter]);
	});
}

function reload() {
	window.location.reload()
}

function getSelectorValue(select) {
	let sel = document.getElementById(select)
	return sel.options[sel.selectedIndex].value
}

function setSortAndReload() {
	let stype = getSelectorValue('sel_ordem')
	let newhref = getHREF().split("?");
	window.location.href = newhref[0] + `?"sortby":"${stype}"`;
}

function main() {
    let data = getData("https://api.estagio.amfernandes.com.br/imoveis")
    console.log(data)
	let imoveis = JSON.parse(data)
    let table = document.getElementById("tabela")

    function getData(url) {
        let request = new XMLHttpRequest()
        request.open("GET", url, false)
        request.send()
        return request.responseText
    }

    const sorted = getSortedBy(imoveis, getSortType())

    function createNewLine(usuario) {
        line = document.createElement("tr")
        tdCidade = document.createElement("td")
        tdBairro = document.createElement("td")
        tdRua = document.createElement("td")
        tdNumero = document.createElement("td")
        tdCep = document.createElement("td")
        tdNome = document.createElement("td")
    
        tdCidade.innerHTML = usuario.cidade
        tdBairro.innerHTML = usuario.bairro
        tdRua.innerHTML = usuario.rua
        tdNumero.innerHTML = usuario.num
        tdCep.innerHTML = usuario.cep
        tdNome.innerHTML = usuario.nome
    
        line.appendChild(tdCidade)
        line.appendChild(tdBairro)
        line.appendChild(tdRua)
        line.appendChild(tdNumero)
        line.appendChild(tdCep)
        line.appendChild(tdNome)
    
        return line
    }

	sorted.forEach(element => {
        let line = createNewLine(element)
        table.appendChild(line)
    });
}

// Irá receber as informações da API
