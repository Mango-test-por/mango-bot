import { image } from './data.js';
import AssetImage from './AssetImage.jsx';

export default function EditorialCard({ card }) {
  return (
    <article className="editorial-card">
      <div className="card-image">
        <AssetImage src={image(card.asset)} alt={card.alt} loading="lazy" decoding="async" width={840} height={630} />
      </div>
      <div className="card-copy"><h3>{card.title}</h3><p>{card.description}</p></div>
    </article>
  );
}
