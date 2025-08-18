export interface User {
  id: number;
  nome: string;
}

export interface Comment {
  id: number;
  textoComentario: string;
  autor: User;
}

export interface Post {
  id: number;
  momentoPost: string; // A data virá como texto (String)
  tituloPost: string;
  conteudoPost: string;
  likes: number;
  autor: User;
  comentarios: Comment[];
}