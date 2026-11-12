import "./market.css";

const store = "https://play.google.com/store/apps/details?id=";
function Download({id,role}:{id:string;role:string}) {
  return <a className="storeBadge" href={store+id} aria-label={'Get the usemarket '+role+' app on Google Play'}><img src="/google-play-badge.png" alt="Get it on Google Play" width="646" height="250"/></a>;
}
function Brand(){return <a className="wordmark" href="/" aria-label="usemarket home"><img src="/usemarket-logo.png" alt="" width="44" height="44"/>usemarket</a>}
export default function Home(){return <div className="launch">
<header className="bar"><Brand/><nav aria-label="Main navigation"><a href="#vendors">For vendors</a><a href="#riders">For riders</a></nav></header>
<main><section className="shopping"><div className="shopCopy"><h1>Market without stress<span>.</span></h1><p>Order food, groceries and everyday essentials from shops near you. We’ll deliver to your door.</p><div className="shopActions"><Download role="customer" id="usemarket.store"/><a className="chat" href="https://wa.me/message/JQ5GZ2TAK6JFA1"><img src="/whatsapp-mark.svg" alt="" width="23" height="23"/>Order on WhatsApp</a></div><details><summary>Scan to order on WhatsApp</summary><img src="/whatsapp-order.svg" width="170" height="170" alt="Scan this QR code with your phone to open WhatsApp"/></details></div><img className="heroArt" src="/market-hero.webp" width="1536" height="1024" alt="A usemarket rider carrying groceries through a local market"/></section>
<section className="partners" aria-label="Vendor and rider apps">{[
 {anchor:"vendors",role:"vendor",title:"Sell on usemarket",body:"Add your products, receive orders and let local customers shop from you.",id:"com.usemarket.usemarketvendor"},
 {anchor:"riders",role:"rider",title:"Deliver with usemarket",body:"Use the rider app to accept deliveries, pick up orders and track your earnings.",id:"usemarket.rider"}
].map(a=><article key={a.id} id={a.anchor}><img className="partnerArt" src={'/market-'+a.role+'.webp'} width="1536" height="1024" alt="" loading="lazy"/><div><h2>{a.title}</h2><p>{a.body}</p><Download role={a.role} id={a.id}/></div></article>)}</section></main>
<footer><Brand/><nav aria-label="Footer"><a href="/terms">Terms</a><a href="https://policy.usemarket.store">Privacy policy</a><a href="mailto:support@usemarket.store">Contact support</a></nav><address>Area 1, Providence Estate, Eleyele, Ibadan, Oyo State, Nigeria.</address></footer></div>}
