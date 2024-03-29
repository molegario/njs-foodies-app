// import MainHeader from "@/components/main-header/main-header";
// import Link from "next/link";

import classes from './page.module.css';
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);
  if(!meal) {
    //re-route to not found on error - assume bad ref
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary
  };
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);
  if(!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');
  return <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image src={`https://olegario-nextjs-projects-bucket.s3.ca-central-1.amazonaws.com/${meal.image}`} alt={'A delicious meal'} fill />
      </div>
      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creator}>
          by <a href={`mailto:${meal.creator_email}`}>{meal.creator_email}</a>
        </p>
        <p className={classes.summary}>{meal.summary}</p>
      </div>

    </header>  
    <main>
      <p 
        className={classes.instructions}
        dangerouslySetInnerHTML={{
          __html: meal.instructions
        }}
      >

      </p>
    </main>
  </>
}