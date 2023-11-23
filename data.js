export let contatos = [
  {
    "id": 1,
    "nome": "Aigneis",
    "telefone": "(938) 8836332",
    "email": "abatie0@pinterest.com",
    "grupos": "Tanoodle",
  },
  {
    "id": 2,
    "nome": "Rooney",
    "telefone": "(202) 3674807",
    "email": "rbruty1@163.com",
    "grupos": "Midel",
  },
  {
    "id": 3,
    "nome": "Koressa",
    "telefone": "(337) 5716338",
    "email": "kdorrins2@goodreads.com",
    "grupos": "Kwideo",
  },
  {
    "id": 4,
    "nome": "Menard",
    "telefone": "(601) 9129492",
    "email": "merie3@tamu.edu",
    "grupos": "Kanoodle",
  },
  {
    "id": 5,
    "nome": "Suzanne",
    "telefone": "(484) 7724805",
    "email": "sdahl4@phpbb.com",
    "grupos": "Topicshots",
  }
]

function getId() {
  let id = 0;
  contatos.forEach(item => {
      if(item.id > id)
          id = item.id;
  });
  return id+1;
};

export const addContato = (item) => {
  item.id = getId();
  contatos = [...contatos, item];
}

export const editContato = (novoItem) => {
  const idx = contatos.findIndex((item) => item.id === novoItem.id);
  contatos = [
      ...contatos.slice(0, idx),
      novoItem,
      ...contatos.slice(idx+1)
  ]
}

export const removeContato = (id) => {
  contatos = contatos.filter((item) => item.id != id? true:false);
}