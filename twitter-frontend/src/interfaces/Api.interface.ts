export interface User {
  id: number;
  nome: string;
}

export interface Post {
  id: number;
  momentoPost: string;
  conteudoPost: string;
  likes: number;
  autor: User;
  comentarios: any[]; // Simplificado
}

export interface Comment {
  id: number;
  textoComentario: string;
  autor: {
    nome: string;
  };
}
