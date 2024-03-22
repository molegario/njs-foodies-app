import Image from 'next/image';
import classes from './meal-item.module.css';
import Link from 'next/link';

export default function MealItem ({
  title,
  slug,
  image,
  summary,
  creator,
}) {
  return <article
    className={classes.meal}
  >
    <header>
      <div
        className={classes.image}
      >
        <Image src={`https://olegario-nextjs-projects-bucket.s3.ca-central-1.amazonaws.com/${image}`} alt={title} fill />
      </div>
      <div
        className={classes.headerText}
      >
        <h2>{title}</h2>
        <p>{creator}</p>
      </div>
    </header>
    <div
      className={classes.content}
    >
      <p className={classes.summary}>{summary}</p>
      <div
        className={classes.actions}
      >
        <Link href={`/meals/${slug}`}>View Details</Link>
      </div>
    </div>
  </article>
}