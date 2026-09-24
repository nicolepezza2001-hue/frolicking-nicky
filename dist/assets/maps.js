/* Keep map actions separate from checkbox labels so navigation never changes progress. */
const viennaMapStops = [["Stephansdom"], ["Graben", "Kohlmarkt"], ["Österreichische Nationalbibliothek Prunksaal"], ["Hofburg", "Heldenplatz", "Volksgarten"], ["Reinthaler’s Beisl"], ["Parlament", "Rathaus", "Burgtheater", "Universität Wien", "Votivkirche"], ["Café Sperl", "Café Jelinek", "Kleines Café"], ["Restaurants Neubau", "Restaurants Spittelberg"], ["Wiener Staatsoper", "Volksoper", "Musikverein", "Konzerthaus"], ["Schönbrunn Palace"], ["Schönbrunn Palace Gardens", "Gloriette"], ["Restaurants Meidling", "Restaurants Mariahilf"], ["Mariahilfer Straße", "Neubaugasse"], ["Mariahilf", "Neubau", "Spittelberg"], ["Otto Wagner Pavillon Karlsplatz", "Majolikahaus"], ["Austrian restaurants Vienna"], ["Kaiserschmarrn Vienna"], ["Upper Belvedere"], ["Belvedere Gardens"], ["Karlskirche"], ["Naschmarkt"], ["Kunsthistorisches Museum"], ["MuseumsQuartier"], ["Restaurants Neubau"], ["Neubau"], ["Secession"], ["Leopold Museum"], ["Albertina"], ["Hundertwasserhaus"], ["Kunst Haus Wien"], ["Wiener Riesenrad"], ["Grüner Prater"], ["Restaurants Karmelitermarkt"], ["Donaukanal"], ["Kahlenberg", "Nussdorf"], ["Heuriger Nussdorf", "Heuriger Grinzing", "Heuriger Neustift am Walde"], ["Heuriger Vienna"]];
const mexicoMapStops = {"juarez": ["Juárez Mexico City"], "reforma": ["Ángel de la Independencia"], "roma": ["Plaza Río de Janeiro Roma Norte", "Colima Roma Norte", "Álvaro Obregón Roma Norte"], "condesa": ["Parque México", "Avenida Amsterdam Condesa"], "drinks": ["Pistilo", "Salón Palomilla"], "otherbar": ["Pistilo", "Salón Palomilla"], "zocalo": ["Zócalo"], "cathedral": ["Catedral Metropolitana"], "templo": ["Museo del Templo Mayor"], "charco": ["CHARCO Centro Histórico"], "bellas": ["Palacio de Bellas Artes"], "alameda": ["Alameda Central"], "moro": ["Churrería El Moro Centro Histórico"], "anthropology": ["Museo Nacional de Antropología"], "park": ["Bosque de Chapultepec"], "castle": ["Castillo de Chapultepec"], "terraces": ["Castillo de Chapultepec"], "frida": ["Museo Frida Kahlo Casa Azul"], "squares": ["Jardín Centenario Coyoacán", "Plaza Hidalgo Coyoacán"], "market": ["Mercado de Coyoacán"], "coffee": ["Cafés Coyoacán"], "early": ["Triver Coliving Florencia 39"], "home": ["Triver Coliving Florencia 39"], "teoti": ["Zona Arqueológica de Teotihuacán"], "avenue": ["Calzada de los Muertos Teotihuacán"], "lunch": ["Restaurants near Zona Arqueológica de Teotihuacán"], "vasconcelos": ["Biblioteca Vasconcelos"], "quetzal": ["Parque Quetzalcóatl Naucalpan"], "frances": ["Panteón Francés de la Piedad Avenida Cuauhtémoc"], "odette": ["ODETTE Lomas de Chapultepec"]};
// Keep one city qualifier: repeated country/city terms can fail to resolve in Maps.
const directMapLinks = {
 'Rosetta': 'https://maps.app.goo.gl/icKcDtrBtksoT8bH8',
 'Maizajo': 'https://www.google.com/maps/place/Maizajo/@19.4148572,-99.1781999,17z/data=!3m1!4b1!4m6!3m5!1s0x85d1f8662726bc5d:0xd437703208a9d19a!8m2!3d19.4148572!4d-99.1781999!16s%2Fg%2F11ggptnjt4'
};
function mapUrl(place, city) {
 if(directMapLinks[place]) return directMapLinks[place];
 const outsideCity=/Teotihuac|Naucalpan/i.test(place);
 const query=place.trim()+(outsideCity||place.toLowerCase().includes(city.toLowerCase())?'':' '+city);
 return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query);
}
function addMapLinks(label, places, city) {
 const row=document.createElement('div'); row.className='fn-stop';
 label.before(row); row.append(label);
 const links=document.createElement('div');links.className='fn-map-links';
 for(const place of places){const a=document.createElement('a');a.href=mapUrl(place,city);a.target='_blank';a.rel='noopener noreferrer';a.textContent=places.length===1?'Map ↗':place+' ↗';a.setAttribute('aria-label','Find '+place+' on Google Maps (opens in a new tab)');links.append(a);}
 row.append(links);
}
if(document.body.classList.contains('fn-vienna')){
 document.querySelectorAll('label.item').forEach((label,i)=>addMapLinks(label,viennaMapStops[i]||[label.querySelector('strong').textContent],'Vienna'));
}else if(document.body.classList.contains('fn-mexico')){
 document.querySelectorAll('label.task').forEach(label=>{const id=label.querySelector('input').id;addMapLinks(label,mexicoMapStops[id]||[label.querySelector('.task-title').textContent],'Mexico City');});
 document.querySelectorAll('.useful li').forEach(li=>{const a=document.createElement('a');a.href=mapUrl(li.querySelector('strong').textContent,'Mexico City');a.target='_blank';a.rel='noopener noreferrer';a.className='fn-salon-map';a.textContent='Map ↗';li.append(a);});
}
