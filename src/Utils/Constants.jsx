export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const numberRegex = /^[0-9]{1,3}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const hasSpecialChar = (text) => /[!@#$%^&*(),.?":{}|<>]/.test(text);
export const hasUppercase = (text) => /[A-Z]/.test(text);
export const hasNumber = (text) => /[0-9]/.test(text);

export const CargosList = [
	{id: 1, label: 'Diretor(a)'},
	{id: 2, label: 'Coordenador(a)'},
	{id: 3, label: 'Professor(a)'},
	{id: 4, label: 'Apoio'},
]

export const  DisciplinasList = [
	{key: 1, value: 'Português'},
	{key: 2, value: 'Matemática'},
	{key: 3, value: 'História'},
	{key: 4, value: 'Geografia'},
	{key: 5, value: 'Ciências'},
	{key: 6, value: 'Religião'},
	{key: 7, value: 'Artes'},
	{key: 8, value: 'Educação Física'},
	{key: 9, value: 'Laboratório de Redação'},
	{key: 10, value: 'TDIC'},
	{key: 11, value: 'Projeto de Vida'},
	{key: 12, value: 'AO de Português'},
	{key: 13, value: 'AO de Matemática'},
	{key: 14, value: 'LCP'},
	{key: 15, value: 'LA'},
]

export const TurnoList = [
	{key: 1, value: 'Manhã'},
	{key: 2, value: 'Tarde'},
	{key: 3, value: 'Noite'},
	{key: 4, value: 'Integral'},
	{key: 5, value: 'EJA'},
]

export const FuncionalidadesList = [
	{id: 1, label: 'Estudo'},
	{id: 2, label: 'Esporte'},
	{id: 3, label: 'Informática'},
	{id: 4, label: 'Leitura'},
	{id: 5, label: 'Reforço'},
	{id: 6, label: 'Educação Especial'},
	{id: 7, label: 'EJA'},
	{id: 8, label: '2ª Chamada'},
]


// export const data = [];

export const data = [
  {
    
		id: 1,
		name: "João Pedro Benício de Sousa magalhães",
		rule: "teacher",
		disciplina: "Português",
		sala: "Sala de Informática",
    type: "Info",
		day: "22/03/2025",
		horario: "09:00",
		turma: "7º A"
  },
  {
    
		id: 2,
		name: "Bruna Costa Nascimento",
		rule: "teacher",
		disciplina: "Matemática",
		sala: "Sala de Informática",
    type: "Sport",
		day: "22/03/2025",
		horario: "10:00",
		turma: "8º B"
  },
  {
    
		id: 2,
		name: "Mary",
		rule: "teacher",
		disciplina: "Matemática",
		sala: "Sala de Informática",
    type: "Libr",
		day: "22/03/2025",
		horario: "10:00",
		turma: "8º B"
  },
  {
    
		id: 2,
		name: "Mary",
		rule: "teacher",
		disciplina: "Matemática",
		sala: "Sala de Informática",
    type: "Sport",
		day: "22/03/2025",
		horario: "10:00",
		turma: "8º B"
  },
  {
    
		id: 2,
		name: "Mary",
		rule: "teacher",
		disciplina: "Matemática",
		sala: "Sala de Informática",
    type: "Sport",
		day: "22/03/2025",
		horario: "10:00",
		turma: "8º B"
  },
  {
    
		id: 2,
		name: "Mary",
		rule: "teacher",
		disciplina: "Matemática",
		sala: "Sala de Informática",
    type: "Sport",
		day: "22/03/2025",
		horario: "10:00",
		turma: "8º B"
  },
  {
    
		id: 2,
		name: "Mary",
		rule: "teacher",
		disciplina: "Matemática",
		sala: "Sala de Informática",
    type: "Sport",
		day: "22/03/2025",
		horario: "10:00",
		turma: "8º B"
  },
];