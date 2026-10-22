import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectVisual from './ProjectVisual.jsx';

// Cover for cards and the modal: the supplied screenshot when there is one,
// otherwise the abstract illustration, labelled so it is never mistaken for the app.
export function ProjectCover({ project }) {
  const thumb = project.media?.thumbnail;
  const [failed, setFailed] = useState(false);

  if (!thumb || failed) {
    return (
      <div className="project-visual">
        <ProjectVisual name={project.visual} bare />
        <span className="project-visual__tag" aria-hidden="true">Illustration</span>
      </div>
    );
  }

  return (
    <div className="project-visual">
      <img
        className="project-visual__img"
        src={thumb.src}
        alt={thumb.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

// Thumbnail first, then the gallery, without repeating the same file.
export function getGalleryImages(project) {
  const { thumbnail, gallery = [] } = project.media ?? {};
  const images = thumbnail ? [thumbnail, ...gallery] : [...gallery];
  return images.filter((img, i) => images.findIndex((other) => other.src === img.src) === i);
}

export function ProjectGallery({ images, title }) {
  const [failed, setFailed] = useState([]);
  const [index, setIndex] = useState(0);
  const shown = images.filter((img) => !failed.includes(img.src));
  if (!shown.length) return null;

  const current = Math.min(index, shown.length - 1);
  const image = shown[current];
  const go = (delta) => setIndex((current + delta + shown.length) % shown.length);
  const many = shown.length > 1;

  const onKeyDown = (event) => {
    if (!many) return;
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  };

  return (
    <div className="gallery" role="group" aria-roledescription="gallery" aria-label={`${title} screenshots`} onKeyDown={onKeyDown}>
      <figure className="gallery__stage">
        <img
          key={image.src}
          className="gallery__img"
          src={image.src}
          alt={image.alt}
          decoding="async"
          onError={() => setFailed((list) => [...list, image.src])}
        />
        {image.caption && <figcaption className="gallery__caption">{image.caption}</figcaption>}
        {many && (
          <>
            <button type="button" className="gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Previous screenshot">
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button type="button" className="gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Next screenshot">
              <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </>
        )}
      </figure>

      {many && (
        <>
          <div className="gallery__thumbs">
            {shown.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className="gallery__thumb"
                aria-current={i === current ? 'true' : undefined}
                aria-label={`Show screenshot ${i + 1} of ${shown.length}`}
                onClick={() => setIndex(i)}
              >
                <img src={img.src} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <p className="gallery__count mono" aria-live="polite">
            {current + 1} / {shown.length}
          </p>
        </>
      )}
    </div>
  );
}

// Turns a supplied video URL into an embed, a native player, or a plain link.
export function resolveVideo(url) {
  if (!url) return null;
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { kind: 'file', src: url };

  let parsed;
  try {
    parsed = new URL(url, window.location.origin);
  } catch {
    return { kind: 'link', src: url };
  }
  const host = parsed.hostname.replace(/^www\./, '');
  let id = null;
  if (host === 'youtu.be') id = parsed.pathname.slice(1);
  else if (host.endsWith('youtube.com')) {
    id = parsed.searchParams.get('v') ?? parsed.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)?.[1];
  }
  if (id) return { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${id}` };

  if (host === 'vimeo.com') {
    const vimeoId = parsed.pathname.match(/^\/(\d+)/)?.[1];
    if (vimeoId) return { kind: 'embed', src: `https://player.vimeo.com/video/${vimeoId}` };
  }
  if (host === 'loom.com') {
    const loomId = parsed.pathname.match(/\/share\/([^/?]+)/)?.[1];
    if (loomId) return { kind: 'embed', src: `https://www.loom.com/embed/${loomId}` };
  }
  return { kind: 'link', src: url };
}

export function ProjectVideo({ video, title }) {
  const resolved = resolveVideo(video?.url);
  if (!resolved || resolved.kind === 'link') return null;
  const label = video.title ?? `${title} demo video`;

  return (
    <div className="video-frame">
      {resolved.kind === 'file' ? (
        <video src={resolved.src} controls preload="metadata" aria-label={label} />
      ) : (
        <iframe
          src={resolved.src}
          title={label}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}
