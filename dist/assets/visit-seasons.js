// Jan–Dec, in order. Ratings are editorial judgments for the itinerary shown,
// informed by the sources below; they are not weather forecasts.
export const visitSeasons = {
  vienna: {
    scope: 'For city walks, palace gardens and museum afternoons.',
    ratings: ['Okay','Okay','Good','Good','Best','Best','Good','Good','Best','Good','Okay','Good'],
    note: 'My pick: May–June or September, when long walks and a café stop outside feel like the obvious plan. July and August can be hot and busy; winter is colder with shorter days, but December earns its place for the Christmas markets. Expect holiday crowds and pricier stays around Christmas and New Year.',
    reasons: ['Cold, short days; plenty of indoor culture.','Still wintry; better for museums than gardens.','Cool and changeable, with spring arriving.','Spring gardens; pack layers and allow for Easter crowds.','Comfortable walking weather and gardens in bloom.','Long evenings; warmer days and occasional storms.','Hot spells, summer visitors and thunderstorms.','Summer heat and busy sights; plan shady breaks.','Milder days for walking and vineyard outings.','Autumn colours; cooler evenings and shorter days.','Often grey and chilly; markets start later in the month.','Christmas markets offset the cold; holiday demand rises.'],
    sources: [['Vienna tourism · climate & seasons','https://www.wien.info/en/travel-info/tourist-info/climate-and-weather-in-vienna-709530']]
  },
  'mexico-city': {
    scope: 'For Mexico City and the day trips in this itinerary.',
    ratings: ['Good','Best','Best','Good','Okay','Okay','Okay','Okay','Okay','Good','Best','Good'],
    note: 'My pick: February–March or November after Día de Muertos, for neighbourhood wandering without planning every afternoon around rain. April and May can feel hot in the sun; June–September works better with early outings and indoor afternoons. Bring a layer for cool evenings, and book ahead around Día de Muertos and Christmas, when demand can push prices up.',
    reasons: ['Mostly dry; cold mornings and evenings.','Dry days and comfortable daytime wandering.','Dry, warming days; a lovely walking month.','Hotter afternoons; Easter can affect opening hours.','Often the hottest period; rain begins to build.','Rainy season; keep outdoor plans for mornings.','Frequent afternoon rain; leave room to rearrange outings.','Rain continues; museums make useful afternoon plans.','Wet weather persists; Independence Day brings celebrations.','Rain usually eases; late-month events increase demand.','Drier and mild; Día de Muertos brings crowds.','Dry days, chilly nights and Christmas demand.'],
    sources: [['Lonely Planet · Mexico City through the year','https://www.lonelyplanet.com/articles/best-time-to-visit-mexico-city']]
  },
  'san-miguel': {
    scope: 'For San Miguel de Allende and the Guanajuato and hot-springs day trips in this itinerary.',
    ratings: ['Good','Best','Best','Good','Okay','Okay','Okay','Okay','Okay','Good','Best','Good'],
    note: 'My pick: November, or February–March, for dry, sunny days and rooftop evenings. April and May are the warmest months; June–September brings afternoon storms, so keep outings for the morning. Nights from December to February get chilly, so pack a warm layer, and book ahead around Semana Santa, Día de Muertos and Christmas.',
    reasons: ['Dry and sunny; cold nights and mornings.','Dry, mild days; comfortable walking weather.','Warm, dry days; Semana Santa or the film festival can bring crowds.','Warm and very dry; Easter demand in some years.','The warmest month, still mostly dry.','Rainy season begins; afternoon storms.','Wettest stretch; plan mornings outdoors.','Frequent afternoon rain, greener hills.','Rain continues; patron-saint celebrations late in the month.','Rain eases; cooler, fresher days.','Dry and clear; Día de Muertos brings visitors.','Dry, chilly nights and Christmas demand.'],
    sources: [['Falling in Love with San Miguel · weather by month','https://fallinginlovewithsanmiguel.com/san-miguel-de-allende-monthly-weather-guide/']]
  },
  vietnam: {
    scope: 'A compromise for this south–north–central route; regional seasons differ.',
    ratings: ['Good','Good','Best','Best','Okay','Okay','Okay','Okay','Avoid','Avoid','Okay','Good'],
    note: 'My pick: March–April for the best balance between island time, northern scenery and Hoi An evenings. The north can still be misty in March. Summer brings heat and rain; September–October is my least flexible choice for this whole route because central storms and flooding can disrupt plans. Tết, in January or February, brings busy transport, higher fares and some business closures.',
    reasons: ['Dry south; cold north, wetter central coast.','Improving central weather; check Tết dates.','Good regional balance; northern mist is possible.','Mostly favourable across the route; heat builds.','Hotter; southern rains begin.','Northern and southern rain; central beaches fare better.','Hot and humid; northern mountain roads need care.','Wet north and south; central heat.','Central storm risk; wet conditions elsewhere.','Northern weather improves; central flooding can disrupt travel.','Dry south returns; central rain remains a compromise.','Good southern beaches; chilly north, wetter centre.'],
    sources: [['Vietnam tourism · regional weather','https://vietnam.travel/things-to-do/weather-and-climate-vietnam'],['Vietnam tourism · Tết travel','https://vietnam.travel/faqs']]
  },
  japan: {
    scope: 'For Tokyo, Kyoto, Osaka and Takayama, rather than all of Japan.',
    ratings: ['Okay','Okay','Best','Best','Best','Okay','Avoid','Avoid','Okay','Best','Best','Good'],
    note: 'My pick: cherry blossom season, absolutely. Yes, it’s busier and stays cost more, but it’s worth it — I’d happily plan a trip around it. Bloom timing varies by place and year, so keep your dates flexible and book ahead. Mid-to-late May after Golden Week and October–November are lovely alternatives. Pack warmer layers for Takayama.',
    reasons: ['Cold; snowy Takayama and New Year closures.','Cold city days; snow in Takayama.','Best for the late-month cherry blossom season; earlier March is cooler. Crowds and higher prices are worth it.','Cherry blossoms make this a top pick despite crowds and higher prices. Bloom timing varies; Golden Week begins late April.','Best after Golden Week, before the main rains.','Rainy season; allow flexible outdoor plans.','Rain gives way to intense heat and humidity.','Very hot and humid; Obon travel adds demand.','Lingering heat and elevated typhoon disruption risk.','More comfortable exploring; cooler Takayama and autumn demand.','Crisp days and foliage; popular Kyoto spots stay busy.','Often dry in the cities; cold mountains and year-end closures.'],
    sources: [['JNTO · May & Golden Week','https://www.japan.travel/en/guide/may/'],['JNTO · summer','https://www.japan.travel/en/guide/summer-guide/'],['JNTO · September','https://www.japan.travel/en/guide/september/'],['JNTO · travel seasons & holidays','https://www.japan.travel/en/gc/tips/']]
  },
  bratislava: {
    scope: 'For this walking day, with café stops and castle views.',
    ratings: ['Okay','Okay','Okay','Good','Best','Best','Good','Good','Best','Good','Okay','Good'],
    note: 'My pick: May–June or September for a slow day on foot, with time to sit outside between the Old Town and the castle. July and August can be hot and busier; autumn is quieter as the days cool. December is lovely for Christmas markets, though you’ll want warm layers and an earlier start for daylight.',
    reasons: ['Cold and short on daylight for a walking day.','Wintry weather; plan plenty of indoor stops.','Changeable early spring; keep warm layers handy.','Spring greenery and increasingly pleasant walks.','Comfortable outdoor exploring and café terraces.','Long days; summer events begin.','Warm to hot; busier summer streets.','Summer heat and visitors; pause indoors at midday.','Milder walks, fewer tourists and wine-season events.','Autumn colours; cooling weather and shorter days.','Chilly, shorter days; less terrace time.','Christmas markets add appeal despite the cold.'],
    sources: [['Visit Bratislava · seasons','https://www.visitbratislava.com/your-trip/season/']]
  }
};
