export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const hasSpecialChar = (text) => /[!@#$%^&*(),.?":{}|<>]/.test(text);
export const hasUppercase = (text) => /[A-Z]/.test(text);
export const hasNumber = (text) => /[0-9]/.test(text);


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