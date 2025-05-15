export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const numberRegex = /^[0-9]{1,3}$/;
export const serieRegex = /^[0-9]{1}$/;
export const tombRegex = /^\d{3}-[A-Z]-\d{4}$/;

export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const hasSpecialChar = (text) => /[!@#$%^&*(),.?":{}|<>]/.test(text);
export const hasUppercase = (text) => /[A-Z]/.test(text);
export const hasNumber = (text) => /[0-9]/.test(text);

export const removerAcentos = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C');
};

export const CargosList = [
	{id: 1, label: 'Diretor(a)'},
	{id: 2, label: 'Coordenador(a)'},
	{id: 3, label: 'Professor(a)'},
	{id: 4, label: 'Apoio'},
]

export const  DisciplinasList = [
	{id: 1,  label: 'AO de Matemática'},
	{id: 2,  label: 'AO de Português'},
	{id: 3,  label: 'Artes'},
	{id: 4,  label: 'Ciências'},
	{id: 5,  label: 'Educação Física'},
	{id: 6,  label: 'Geografia'},
	{id: 7,  label: 'História'},
	{id: 8,  label: 'LA'},
	{id: 9,  label: 'Laboratório de Redação'},
	{id: 10, label: 'LCP'},
	{id: 11, label: 'Matemática'},
	{id: 12, label: 'Português'},
	{id: 13, label: 'Projeto de Vida'},
	{id: 14, label: 'Religião'},
	{id: 15, label: 'TDIC'},
]

export const TurnoList = [
	{id: 1, label: 'Manhã'},
	{id: 2, label: 'Tarde'},
	{id: 3, label: 'Noite'},
	{id: 4, label: 'Integral'},
]

export const TurmaList = [
	{id: 1, label: 'A'},
	{id: 2, label: 'B'},
	{id: 3, label: 'C'},
]

export const FuncionalidadesList = [
	{id: 1, label: '2ª Chamada'},
	{id: 2, label: 'Educação Especial'},
	{id: 3, label: 'Esporte'},
	{id: 4, label: 'Estudo'},
	{id: 5, label: 'Informática'},
	{id: 6, label: 'Leitura'},
	{id: 7, label: 'Prova externa'},
	{id: 8, label: 'Recuperação'},
  {id: 9, label: 'Reforço'},
]

export const classTypes = [
	{id: 1, label: 'Informática'},
	{id: 2, label: 'Esportes'},
	{id: 3, label: 'Leitura/Estudo'},
	{id: 4, label: 'Provas'},
	{id: 5, label: 'Recuperação/Reforço'},
]

export const Fundamental_Morning_Times = [
	{id: 1,  label: '07:00 às 07:50'},
	{id: 2,  label: '07:50 às 08:40'},
	{id: 3,  label: '08:40 às 10:00'},
	{id: 4,  label: '10:00 às 10:50'},
]

export const Fundamental_Afternoom_Times = [
	{id: 1,  label: '13:00 às 13:50'},
	{id: 2,  label: '13:50 às 14:40'},
	{id: 3,  label: '14:40 às 16:00'},
	{id: 4,  label: '16:00 às 16:50'},
]

export const Fundamental_Integral_Times = [
	{id: 1,  label: '07:00 às 07:50'},
	{id: 2,  label: '07:50 às 08:40'},
	{id: 3,  label: '08:40 às 10:00'},
	{id: 4,  label: '10:00 às 11:00'},
	{id: 5,  label: '13:00 às 13:50'},
	{id: 6,  label: '13:50 às 14:40'},
	{id: 7,  label: '14:40 às 16:00'},
	{id: 8,  label: '16:00 às 16:50'},
]

export const EJA_Times = [
	{id: 1,  label: '18:00 às 18:50'},
	{id: 2,  label: '18:50 às 19:40'},
	{id: 3,  label: '20:00 às 20:40'},
	{id: 4,  label: '20:40 às 21:30'},
]


export const EquipamentsTypes = [
	{id: 1,  label: 'Audio'},
	{id: 2,  label: 'Vídeo'},
	{id: 3,  label: 'Infraestrutura'},
	{id: 4,  label: 'Esportes'},
	{id: 5,  label: 'Música'},
	{id: 6,  label: 'Acessório'},
]