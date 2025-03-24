export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const numberRegex = /^[0-9]{1,3}$/;
export const serieRegex = /^[0-9]{1}$/;
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
	{id: 1, label: 'Português'},
	{id: 2, label: 'Matemática'},
	{id: 3, label: 'História'},
	{id: 4, label: 'Geografia'},
	{id: 5, label: 'Ciências'},
	{id: 6, label: 'Religião'},
	{id: 7, label: 'Artes'},
	{id: 8, label: 'Educação Física'},
	{id: 9, label: 'Laboratório de Redação'},
	{id: 10, label: 'TDIC'},
	{id: 11, label: 'Projeto de Vida'},
	{id: 12, label: 'AO de Português'},
	{id: 13, label: 'AO de Matemática'},
	{id: 14, label: 'LCP'},
	{id: 15, label: 'LA'},
]

export const TurnoList = [
	{id: 1, label: 'Manhã'},
	{id: 2, label: 'Tarde'},
	{id: 3, label: 'Noite'},
	{id: 4, label: 'Integral'},
	{id: 5, label: 'EJA'},
]

export const TurmaList = [
	{id: 1, label: 'A'},
	{id: 2, label: 'B'},
	{id: 3, label: 'C'},
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