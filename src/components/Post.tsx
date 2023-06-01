import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import ptBR from 'date-fns/locale/pt-BR'
import { format, formatDistanceToNow } from 'date-fns';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  avatarUrl: string
  name: string
  role: string
}

interface Content {
  type: 'paragraph' | 'link' | 'hash'
  content: string
}

export interface PostType {
  id: number;
  author: Author
  content: Content[]
  publishedAt: Date
}

type PostProps = {
  post: PostType;
}

export function Post ({ post }: PostProps) {
  const [comments, setComments] = useState(['Post muito bacana, hein?']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })
  const publishedDateRelativeNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments(prevState => [...prevState, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function DeleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);
    
    setComments(commentsWithoutDeletedOne);
  }


  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if(line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if(line.type === 'link') {
            return <p key={line.content}><a href=''>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} action="" className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name='comment'
          value={newCommentText}
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button
            type='submit'
            disabled={isNewCommentEmpty}
          >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => 
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={DeleteComment}
          />
        )}
      </div>
    </article>
  )
}