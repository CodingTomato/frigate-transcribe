import { Hono } from 'hono';
import { html } from 'hono/html';
import { getAllTranscripts } from './db';
import { Transcript } from '../types/Transcript';
import { config } from './config';

export const frontend = new Hono();

interface SiteData {
  title: string;
  children?: any;
}

const Layout = (props: SiteData) => html`
  <html>
    <head>
      <title>${props.title}</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
      />
    </head>
    <body>
      ${props.children}
    </body>
    <style>
      .avatar {
        border-radius: 8px;
        width: 150px;
      }
      .transcript-title {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
      }
      .right {
        display: flex;
        flex-direction: column;
        gap: 0.2em;
      }
    </style>
  </html>
`;

const Home = (props: { siteData: SiteData; transcripts: Transcript[] }) => (
  <Layout {...props.siteData}>
    {props.transcripts.length < 1 && <article>No transcripts found</article>}
    {props.transcripts.map((transcript) => (
      <article>
        <header class='transcript-title'>
          <div class='left'>
            <img
              src={`${config.frigateUrl}/api/events/${transcript.clipId}/thumbnail.jpg`}
              class='avatar'
            ></img>
          </div>
          <div class='right'>
            <span>{transcript.clipId}</span>
            <span>{transcript.detectedLanguage}</span>
            <a
              href={`${config.frigateUrl}/api/events/${transcript.clipId}/clip.mp4`}
              target='_blank'
            >
              Watch video
            </a>
          </div>
        </header>
        <details>
          <summary role='button'>Transcript</summary>
          <p>{transcript.transcript}</p>
        </details>

        {transcript.translated && (
          <details>
            <summary role='button' class='secondary'>
              Translation
            </summary>
            <p>{transcript.translated}</p>
          </details>
        )}
      </article>
    ))}
  </Layout>
);

frontend.get('/', async (c) => {
  const transcripts = await getAllTranscripts();

  const props = {
    transcripts,
    siteData: {
      title: 'Frigate-Transcript: Home',
    },
  };
  return c.html(<Home {...props} />);
});
