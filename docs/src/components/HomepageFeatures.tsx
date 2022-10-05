import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    image: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        NestJS LINE is designed to be easily installed and used to get your LINE
        bot up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        NestJS LINE lets you focus on your bot, and we&apos;ll do the chores. Go
        ahead and start adding some commands and events.
      </>
    ),
  },
  {
    title: 'Inspired by Necord',
    image: '/img/undraw_docusaurus_react.svg',
    description: (
      <>
        NestJS LINE was inspired by{' '}
        <a href={'https://github.com/necordjs/necord'} target={'_blank'}>
          Necord
        </a>
        , a popular NestJS module, used to design DiscordJS bot using NestJS
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
