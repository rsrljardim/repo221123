import { contatos, addContato, editContato, removeContato } from './data.js';


const inpNome = document.querySelector('#inpNome');
const inpTelefone = document.querySelector('#inpTelefone');
const inpEmail = document.querySelector('#inpEmail');
const inpGrupos = document.querySelector('#inpGrupos');

const modal = document.querySelector('#modal');
const botaoAdd = document.querySelector('#btnAdd');
const botaoSalvar = document.querySelector('#btnSalvar');
const botaoEditar = document.querySelector('#btnEditar');
const botaoCancelar = document.querySelector('#btnCancelar');

// EVENTOS -------------------------------------------------

botaoAdd.addEventListener("click", () => abreModal());
modal.addEventListener('close', () => fechaModal());

botaoSalvar.addEventListener("click", () => addItem());
botaoEditar.addEventListener("click", () => editItem());
botaoCancelar.addEventListener("click", () => modal.close());

// EVENTOS -------------------------------------------------

carregaDados();

// function limpaValidacaoInputs() {
//   inpNome.className = "mt-1 py-3 px-4 border border-slate-300 rounded-md hover:border-blue-400 focus:ring focus:border-blue-400 focus:outline-none";
//   inpNome.classList.add('hidden');

//   inpTelefone.className = "mt-1 py-3 px-4 border border-slate-300 rounded-md hover:border-blue-400 focus:ring focus:border-blue-400 focus:outline-none";
//   inpTelefone.classList.add('hidden');

//   inpEmail.className = "mt-1 py-3 px-4 border border-slate-300 rounded-md hover:border-blue-400 focus:ring focus:border-blue-400 focus:outline-none";
//   inpEmail.classList.add('hidden');

//   inpGrupos.className = "mt-1 py-3 px-4 border border-slate-300 rounded-md hover:border-blue-400 focus:ring focus:border-blue-400 focus:outline-none";
//   inpGrupos.classList.add('hidden');
// }

function limpaInputs() {
  inpNome.value = '';
  inpEmail.value = '';
  inpTelefone.value = '';
  inpGrupos.value = '';

  limpaValidacaoInputs();

}

function validaInputs(item) {
  limpaInputs();

}

// function carregaOpcoes() {
//   const listaOpcoes = opcoesUnidade();
//   listaOpcoes.forEach((op, idx) => {
//     selectUn.innerHTML += `<option value="${idx}">${op}</option>`;
//   })
// }

function fechaModal() {
  if(inpNome.getAttribute('data-key')){
    botaoEditar.classList.add('hidden')
    inpNome.removeAttribute('data-key');
  }
  else {
    botaoSalvar.classList.add('hidden');
  }

  modal.close();
  limpaInputs();
}

function abreModal(item) {
  // carregaOpcoes();
  modal.showModal();
  
  if(item) {
    const tds = item.children;
    
    modal.firstElementChild.innerHTML = 'Editar um contato:'
    inpNome.value = tds[0].innerHTML;
    inpTelefone.value = tds[1].innerHTML;
    inpEmail.value = tds[2].innerHTML;
    inpGrupos.value = tds[3].innerHTML;

    inpNome.setAttribute('data-key', item.getAttribute('data-key'));
    botaoEditar.classList.remove('hidden');
  }
  else{
    modal.firstElementChild.innerHTML = 'Adicionar um novo contato:'
    botaoSalvar.classList.remove('hidden');
  }
}

function carregaEventos() {
  const listaEdit = document.querySelectorAll('button[name="editBtn"]');
  listaEdit.forEach(item => {
    item.addEventListener('click', () => abreModal(item.parentElement.parentElement.parentElement));
  });

  const listaRemove = document.querySelectorAll('button[name="removeBtn"]');
  listaRemove.forEach(item => {
    item.addEventListener('click', () => removeItem(item.getAttribute('data-key')));
  });
}

function carregaDados() {
  const divTabela = document.querySelector('#divTabela');
  let tabela;

  tabela =
    `<table>
  <thead>
    <tr>
      <th>NOME</th>
      <th>TELEFONE</th>
      <th>EMAIL</th>
      <th>GRUPOS</th>
      <th>AÇÕES</th>
    </tr>
  </thead>
  <tbody>`;

  contatos.forEach(linha => {
    const { id, ...rest } = linha;


    tabela += `<tr data-key="${id}">`;
    for (const key in rest) {
      tabela += `<td>${rest[key]}</td>`;
    }
    tabela +=
      `<td>
        <div class="flex justify-end gap-3">
          <button data-key="${id}" class="bg-amber-50 px-1 rounded-md hover:bg-amber-100 focus:ring focus:ring-amber-100 focus:outline-none" name="editBtn">
            <span class="material-symbols-outlined text-xl text-amber-400">edit</span>
          </button>
          <button data-key="${id}" class="bg-red-50 px-1 rounded-md hover:bg-red-100 focus:ring focus:ring-red-100 focus:outline-none" name="removeBtn">
            <span class="material-symbols-outlined  text-xl text-red-400">delete</span>
          </button>
        </div>
      </td>`;
    tabela += '</tr>';
  });

  tabela += '</tbody></table>';
  divTabela.innerHTML = tabela;

  carregaEventos();
}

function addItem() {
  // const opcoes = Array.from(selectUn.children).map((op) => {
  //   return (
  //     {
  //       "key": op.value,
  //       "value": op.innerHTML
  //     }
  //   )});

    const item = {
    "id": 0,
    "nome": inpNome.value,
    "telefone": inpTelefone.value,
    "email": inpEmail.value,
    "grupos": inpGrupos.value
  }
  
  console.log(item);

  addContato(item);
  carregaDados();
  fechaModal();
}

function editItem() {
  // const opcoes = Array.from(selectUn.children).map((op) => {
  //   return (
  //     {
  //       "key": op.value,
  //       "value": op.innerHTML
  //     }
  //   )});
  
  const novoItem = {
    "id": Number(inpNome.getAttribute('data-key')),
    "nome": inpNome.value,
    "telefone": inpTelefone.value,
    "email": inpEmail.value,
    "grupos": inpGrupos.value
  }

  editContato(novoItem);
  carregaDados();
  fechaModal();
  
}

function removeItem(item) {
  removeContato(Number(item));
  carregaDados();
}