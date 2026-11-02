const base = 'https://www.porsche.com/international/aboutporsche/jobs/';
export const image = (asset, width = 840, ratio = '4:3') => `https://images-porsche.imgix.net/-/media/${asset}?w=${width}&ar=${encodeURIComponent(ratio)}&fit=crop&crop=focalpoint&q=75&auto=format`;
const card = (title, description, asset, alt, href) => ({ title, description, asset, alt, href });

// Interview-focused hero captions paired with the original imagery.
const dreamImage = '4A0AAC6CFF8F46A191BC3C037FAF5D9E_3E846A3413DE4BEF80103EE9ABBAA48D_001-hero_21-9_5120x2194';
const techImage = '306689238C9642FE942508421897A315_FB93EA0388104A088BD115F08B10E314_001-hero_21-9_5120x2194_Dream-it-Drive-it-Shape-it';
const wheelImage = 'F8D94E1FE88F4F0582365D8AB78F6C81_0A262AEAFACE411FB4827B142BFB0509_001-hero_21-9_5120x2194';
const mobileHeroImages = {
  [dreamImage]: '42B0AE5128AD4778815A6F5E18024171_B7E430FFD690499C95B7241D15B14EEF_001-hero_1-1_mobile_2048x2048',
  [techImage]: '4977C8DAA91F4CAABF7567FA8C7BEC1F_032AAF0CC5854ADC925E70D7AA1416EC_001-hero_1-1_mobile_2048x2048_Dream-it-Drive-it-Shape-it',
  [wheelImage]: '8DA323F3CD0B442DBA50109EC1831690_274D2A3BA9F5440AB02B4879AF3ECB28_001-hero_1-1_mobile_2048x2048',
};
export const highlights = [
  card('Your experience. Your next step.', 'Explore the role and bring your social media marketing story to the conversation.', dreamImage, 'A collage featuring Porsche dreamer Ilaggija and individual vehicle elements.', '#jobs-at-porsche'),
  card('Your next chapter starts here.', 'Prepare for your interview. Share your ideas, your experience, and what drives you.', techImage, 'Two people at a laptop and a colleague painting a vehicle component in a modern workshop.', '#jobs-at-porsche'),
  card('Bring your ideas to life.', 'Show how you turn audience insights into compelling campaigns and meaningful results.', wheelImage, 'A rim of the Taycan Turbo illuminated with red and green light.', '#jobs-at-porsche'),
  card('Every career has a story.', 'Tell yours through the projects, decisions, and achievements that shaped your approach.', dreamImage, 'Porsche dreamer Ilaggija in a collage exploring digitalisation.', '#jobs-at-porsche'),
  card('Come curious. Come prepared.', 'Review the role, choose your strongest work, and bring the questions that matter to you.', wheelImage, 'The sculpted wheel of a Porsche Taycan Turbo in coloured light.', '#jobs-at-porsche'),
].map(slide => ({ ...slide, mobileAsset: mobileHeroImages[slide.asset] }));

export const entryGroups = [
  {
    name: 'Your responsibilities',
    cards: [
      card('Social strategy & editorial planning', 'Translate brand and business objectives into a clear social media strategy. Develop audience-led content pillars, maintain an editorial calendar, and connect product stories, cultural moments, and campaigns across channels.', '24A3C3F879144939A4A6AFD5D69E1401_2CE0BF53623B4928AFBFE72C42033C96_008-extended-teaser-4-3-entry-students-students', 'An intern at Porsche stands on a scooter and smiles at the camera.'),
      card('Creative direction & brand voice', 'Brief creative teams and partners to produce platform-native content with a consistent brand voice. Bring editorial judgement to copy, imagery, and video, balancing creative ambition with clarity, quality, and attention to detail.', '566C0AD58E2849349BE40B74151083B3_115B8527F67448CB9BA5CE7EC91F26BB_008-extended-teaser-4-3-entry-students-doctorate', 'A doctoral student at Porsche smiles at her screen.'),
      card('Campaigns, community & performance', 'Coordinate organic and paid social activity, nurture meaningful audience engagement, and turn performance data into practical recommendations. Work with stakeholders to deliver campaigns on time and explain their contribution to wider marketing goals.', 'B8B891E401DE434996C2722A9645011B_27A3AB666D9B45C79508D5E34CB24E0A_008-extended-teaser-4-3-entry-students-entry', 'A man sits in an office phone booth, typing on his mobile phone.'),
    ],
  },
  {
    name: 'Your experience',
    cards: [
      card('What you bring to the conversation', 'Bring experience managing social media programmes from strategy through delivery and reporting. Be ready to demonstrate strong writing, platform expertise, paid social knowledge, analytical thinking, and confident stakeholder management. Examples of brand-sensitive storytelling and measurable campaign outcomes will help illustrate your approach.', '4B2154FA1DF64C16B319EB92A9A0A054_7CC0D8DB9A4E4FFCB6C389A6003D54D3_008-extended-teaser-4-3-entry-professionals-entry', 'Two happy graduates at Porsche look to the side.'),
    ],
  },
  {
    name: 'Interview preparation',
    cards: [
      card('Select your strongest work', 'Choose two or three campaigns that reflect your social media marketing experience. Include enough context to explain the brief, audience, objectives, and constraints, then show how you moved from insight to execution.', '64A472EFE19E4D89AE4D085FCC15D6F4_BCF355D152FC4E268238705547F3E015_ToGe_PorscheDeutschland_INT_PD_1920x1440', 'Two women drive a Porsche at the Porsche Experience Center.'),
      card('Explain your contribution', 'Distinguish your decisions and responsibilities from the work of the wider team. Describe how you shaped the strategy, briefed collaborators, managed approvals, and kept delivery aligned with the campaign objective.', '426EE1AEEB3C42EFA57D64665DBE1E64_3879E2BAF9F0420B9F51B27FFE2E202D_ToGe_PorscheZentrum_INT_PD_1920x1440', 'A technician stands beside a motor block in a workshop.'),
      card('Connect creative work to results', 'Show how the content supported its intended outcome. Discuss the metrics you selected, why they mattered, and what they revealed about audience response. Give context for performance rather than relying on headline numbers.', '09A00905A24A4DFBAF736653692DD89B_FB8BE4D8300848BE945E4D80021D1319_Entry_subsidiaries_dealer_organisations_INT_PD_1920x1440', 'Two chefs prepare a gourmet menu in the Porsche gastronomy.'),
      card('Prepare a strategic recommendation', 'Consider how you would approach a new social media brief: define the audience, clarify the objective, choose the channels, and outline a measurement plan. Focus on your reasoning and the questions you would ask before committing to a direction.', 'A4F165FEC3EA4F95A453C1A946E7306F_0F3E4BD3D4814FFE9DEB27326797FF94_ToGe_PorscheConsulting_INT_PD_1920x1440', 'Employees collaborate at a Porsche Consulting meeting.'),
      card('Reflect on collaboration', 'Prepare an example of working with creative, communications, media, or regional teams. Explain how you handled competing priorities, incorporated feedback, and helped the group reach a clear decision.', '3302605C3C584ADCABE978D0E40BBDAA_A3BCFDFA1D2442B192200F2F60E88A8D_ToGe_MHP_INT_PD_1920x1440', 'Employees work together in a hybrid meeting.'),
      card('Discuss your tools and workflow', 'Be ready to explain how you use publishing, social listening, advertising, and analytics tools. Describe the workflow behind your editorial calendar, reporting, and optimisation, including how you check the quality of the data.', '3A641EF7D15B487C9C26B7FC5945F2D8_92305270E0E64C918F2A1E0CD33D33BD_ToGe_PorscheEngineering_INT_PD_1920x1440', 'An engineer works on a Porsche infotainment system.'),
      card('Review the brand’s channels', 'Look at Porsche’s social presence before the interview. Bring considered observations about tone, creative formats, community engagement, and consistency across platforms. Separate what you can observe from what would require internal performance data.', '51C494A7F15D459BB13EDBC31B5A98CB_D093A5B0DB0D41B883A74ABA536F93A9_ToGe_PorscheDigital_INT_PD_1920x1440', 'An employee explains an infotainment system.'),
      card('Bring questions of your own', 'Use the interview to understand the team’s priorities, decision-making, and expectations. Ask about the role’s remit, cross-functional relationships, measures of success, and the challenges the successful candidate would help address.', '9D48CB8FE8B84BA2AA4B045D368B3460_39E85602F9CB4CFC9E1D2879704BEE56_ToGe_PorscheLizenzHandelsgesellschaft_INT_PD_1920x1440', 'Two employees chat in an open office.'),
      card('Check your interview arrangements', 'Review the details in your invitation, confirm your availability with the contact who invited you, and check that your portfolio links are accessible. For a remote conversation, test your connection, audio, and screen sharing in advance.', 'F1415F07A1544FD6B2487CC6688E2ED2_22A485EA291A4367B3D94615C456E64E_ToGe_PorscheFinancial_INT_PD_1920x1440', 'Porsche employees gather around a meeting room table.'),
    ],
  },
];

export const benefitGroups = [
  {
    name: 'Strategy & impact',
    cards: [
      card('Define meaningful success', 'Explain how you translate a marketing objective into a social media plan. Discuss the audience behaviour you want to influence, the role each channel plays, and the indicators you would use to evaluate progress.', '975D271DF8CF44FF921486FDE2850CE8_E8CE3388EB394C0C8FCD6F8B61D2F00E_008-extended-teaser-4-3-compensation-compensation', 'A Porsche 911 RSR on a racetrack.'),
      card('Protect the brand’s identity', 'Describe how you maintain a recognisable brand voice while adapting content for different platforms. Bring an example of balancing creative relevance with the standards and expectations of an established brand.', '27467D78F34E4A3CAF99A40816885423_FC59D5761DB44F1F9AAFD975DF43CCAB_008-extended-teaser-4-3-compensation-special-payment', 'Hands in white gloves hold the Porsche Crest.'),
      card('Plan around audience moments', 'Talk through how you identify the moments that matter to an audience. Explain how seasonal planning, product narratives, and timely opportunities fit into an editorial calendar without losing strategic focus.', '3CFB071714BC474FA061A6D14961B124_3BA41C1DC77E4C78B01A8AB0CBD446F6_008-extended-teaser-4-3-compensation-christmas-bonus-PD', 'A family brings a Christmas tree to a mountain holiday home on their Porsche Taycan.'),
      card('Build a sustainable content plan', 'Share how you balance always-on publishing with larger campaigns. Discuss your approach to prioritisation, production capacity, asset reuse, and maintaining quality across a busy content calendar.', 'CA4C632CC80F435CAF22A54CC2F1A6A9_28C4508196B74501B6FF31794082F63D_008-extended-teaser-4-3-compensation-vacation-bonus', 'An idyllic lakeside holiday home with a Taycan Turbo S Cross parked beside it.'),
      card('Evaluate campaign outcomes', 'Prepare a campaign example with a clear objective, your contribution, and an outcome. Explain the trade-offs you made, how you interpreted performance, and what you would carry forward into the next campaign.', '25CCB1CF9B2C46F3B94C038A9E9E5FE7_26373CE88DCC4D4EA76994EA51CE7A07_008-extended-teaser-4-3-compensation-employment-anniversary', 'An orange Porsche 911 GT3 Cup passes a chequered flag on the racetrack.'),
      card('Turn insight into action', 'Discuss a time when audience insight or performance data changed your direction. Show how you formed a hypothesis, tested it, and used the learning to improve creative work, distribution, or the wider strategy.', '876B41BBDD74472DBCFC981617B4D38D_7922701402C743E8A49D052D2F703660_008-extended-teaser-4-3-compensation-innovative-ideas', 'Employees use VR glasses with a virtual Porsche model.'),
    ],
  },
  {
    name: 'Long-term brand building',
    cards: [
      card('Balance immediate and lasting impact', 'Explain how you balance short-term campaign goals with the longer-term development of a brand’s social presence. Consider the relationship between awareness, affinity, engagement, and commercial outcomes.', '39ED1A8FDFAA438D8E4B91B2281D811C_0D1D042F6DD44115ADC6423039D5F489_008-extended-teaser-4-3-retirement-pension-plan', 'A Porsche 911 Carrera Turbo S Cabriolet on a mountain road.'),
      card('Build a measurement framework', 'Discuss the metrics you would track over time and the context needed to interpret them. Explain how you distinguish a temporary spike from a sustained improvement in audience quality or content effectiveness.', '8566F386EB3C40AE94A9F55E2434AE9B_AC50FBA0883942A8AC550A1B7DFADB4F_008-extended-teaser-4-3-retirement-VarioRente', 'Two Porsche 911 RSRs on a sunny racetrack.'),
      card('Create consistency across teams', 'Describe how you work with colleagues and partners to keep social activity aligned with a shared strategy. Consider the role of clear briefs, channel guidance, regular reviews, and documented learning.', '876F66AC0DD1458DA2CE88C1E9FD4A3E_271849EC90084403B7F29060F05E05EF_008-extended-teaser-4-3-retirement-MetallRente', 'Four cheerful Porsche employees in red T-shirts.'),
      card('Exercise sound editorial judgement', 'Bring an example of a sensitive publishing decision. Explain how you assessed the context, involved the right stakeholders, and chose an approach that served the audience while respecting the brand.', '8C17820042B14B438145FB7323B61068_2B2D58F33C9145C7A0A1C86C4CAE138C_008-extended-teaser-4-3-retirement-disability-insurance', 'The Porsche Crest with gold Porsche lettering.'),
    ],
  },
  {
    name: 'Content & storytelling',
    cards: [
      card('Find the human story', 'Discuss how you uncover stories that make a brand relevant to its audience. Show how you turn people, experiences, craftsmanship, or product detail into a compelling editorial idea.', '20725440F708484E8B79C79D1D9BD116_D27F0FEAADD845E5B79E164A2F82C316_008-extended-teaser-4-3-catering-catering', 'The Porsche staff restaurant in Weissach.'),
      card('Develop a strong creative brief', 'Explain what a creative team needs from you to deliver effective social content. Cover the audience, objective, key message, format, tone, deliverables, and the criteria for reviewing the work.', '9B72F545B5794D70B4561B55F3732A4C_D376D0D9953D43449262B21AF0EAE9C2_008-extended-teaser-4-3-catering-fresh-cuisine', 'Fresh dishes, finger foods and colourful smoothies.'),
      card('Write for the channel', 'Prepare examples of adapting the same core message for different social platforms. Discuss how you adjust structure, tone, captions, and calls to action while maintaining a consistent brand identity.', '6CD5CE85993D4C49ABE3CBC735A9D63D_8F55D4002DBB4AA9A04416FC7C701CEF_008-extended-teaser-4-3-catering-cafeterien-shops', 'A Porsche cafeteria with visitors and a yellow Porsche 911.'),
      card('Make every asset work harder', 'Talk through how you plan content adaptations from a single production. Consider short-form video, stills, behind-the-scenes material, and follow-up stories, with a clear purpose for each format.', 'A1ABCE3F15F64963BD38267A0DF76298_D7B472A0FA554D72A2F33647227010A2_008-extended-teaser-4-3-catering-togo', 'A selection of freshly prepared packaged meals to go.'),
      card('Deliver with attention to detail', 'Describe your approach to reviewing social content before publication. Explain how you check messaging, accessibility, asset quality, links, scheduling, and stakeholder approval without slowing delivery unnecessarily.', 'D5F564BC4AA74231B6712A6A3E651E0A_0E74EB25A7D243CA884A64DB7F04D549_008-extended-teaser-4-3-catering-special-restaurant', 'A dessert served at an elegantly set table.'),
    ],
  },
  {
    name: 'Paid social & distribution',
    cards: [
      card('Choose the right channels', 'Explain how you select platforms and placements for a campaign. Connect channel choice to audience behaviour, the communication objective, the available creative, and the role of organic and paid distribution.', 'CB647CEFB7F447D3AFD1685AD26934C1_A329B93F62154FDDA180539274BCCB20_008-extended-teaser-4-3-mobility-deutsche-bahn', 'A red Deutsche Bahn train travels through a green landscape.'),
      card('Design a useful testing approach', 'Describe how you test audiences, messages, or formats without losing sight of the campaign goal. Discuss budget allocation, creative variation, the learning period, and how you decide what to change.', 'ECB82DD8519C469081CD99CAEBDA6429_D76666AF4B9E4990B55D0E983B51D01A_008-extended-teaser-4-3-mobility-jobrad', 'Two people with bicycles in a sunny green meadow.'),
      card('Connect reporting to decisions', 'Be ready to discuss a paid social report and the decisions it informed. Explain how you interpret delivery, audience response, and conversion signals, including the limits of attribution.', '3D0E0AD8313848C1900F97C0AB6406EC_150B3A3FDCF846F0BB70A144FB6E33F6_008-extended-teaser-4-3-mobility-charging-points', 'Two Porsche Taycans charging at the Porsche Experience Centre Leipzig.'),
    ],
  },
  {
    name: 'Community & reputation',
    cards: [
      card('Listen before responding', 'Discuss how social listening and community feedback inform your work. Explain how you identify useful signals, distinguish individual comments from broader trends, and share relevant insight with the team.', '7426F2CC7BEF41C8B3091683B528DC8E_1FD5298EE08C452DA1706414352D7500_008-extended-teaser-4-3-health-check-up', 'The green living wall of the Porsche Health Centre.'),
      card('Handle sensitive conversations', 'Prepare an example of managing a difficult audience interaction. Explain your response, the escalation path you used, and how you balanced clarity, empathy, and the need for accurate information.', 'F8477CA58D2242D687FFBAD5C2430B9C_1A376B2759EF469E9CA0FFBCBDA05B59_008-extended-teaser-4-3-health-cancer-help', 'A doctor in a white coat holds a glass sphere.'),
      card('Create a shared response approach', 'Talk about how you establish community guidance and align with communications or customer-facing teams. Consider tone of voice, recurring questions, response expectations, and how guidance evolves over time.', 'F4D1A75E3ED2449C9E273BC1621F301A_46506D11487F41DFB01158450476B810_008-extended-teaser-4-3-health-health-promotion', 'Employees take part in a seminar.'),
      card('Maintain quality under pressure', 'Describe how you manage live activity or high-volume periods. Explain how you prioritise incoming issues, keep the team informed, and maintain accuracy when the pace increases.', '6E732C59E34B431A89D68BB9CEF4F6B3_714B0B5147EF4BDE938634CCA56E3035_008-extended-teaser-4-3-health-ergonomics', 'A Porsche employee at his workstation in the plant.'),
      card('Build meaningful engagement', 'Explain what an engaged community means to you beyond likes and follower counts. Share how you encourage useful participation, recognise audience interests, and evaluate the quality of the conversation.', '50C4350896A7487997B61CDBD2DC697A_DCD63310658A4D7C9DD9BC4CCAB0A458_008-extended-teaser-4-3-health-social-counseling', 'The Porsche Crest on a silver-grey 911 Sport Classic.'),
    ],
  },
  {
    name: 'Collaboration & leadership',
    cards: [
      card('Understand different audiences', 'Discuss how you adapt a campaign for distinct audience needs without diluting its central idea. Bring an example of using research or feedback to make communication more relevant and inclusive.', '9823770FF5254F1994427AB9DFC387A7_DCC7BEB6D4D54EE9AC3E1858C13511A3_008-extended-teaser-4-3-career-family-child-holiday-care', 'Children wearing helmets enjoy a horse-riding excursion.'),
      card('Build productive relationships', 'Explain how you establish trust with colleagues, agencies, and creators. Discuss your approach to clear expectations, constructive feedback, and resolving differences in creative or strategic direction.', 'BB1C8D3F92AA4D8D8B0C5345F1BC1345_460F30C598674FEF9D68225C30194889_008-extended-teaser-4-3-career-family-family-service', 'Two people holding hands.'),
      card('Support team development', 'Share an example of helping a colleague or partner improve their work. Explain how you offer feedback, share knowledge, and create space for new ideas while remaining accountable for the outcome.', 'BF28B48D27194F5A9B67A5EE6AC17C91_E68287F9ADA14354ACAD6880FC0C29A4_008-extended-teaser-4-3-career-family-support--for-parents', 'A toddler on a green Baby Porsche push car.'),
      card('Take ownership of delivery', 'Describe a situation in which you moved a complex project forward. Cover how you clarified responsibilities, removed blockers, managed dependencies, and communicated risks or changes early.', '4447C61195CB4C3D8E07BFA557463E4E_7DD59A0EE2F8457A96CCC33B3CD1C36F_008-extended-teaser-4-3-career-family-volunteer-work', 'Porsche employees taking part in volunteer activities.'),
      card('Connect people through shared goals', 'Talk through how you keep a cross-functional team aligned during a campaign. Explain how you recognise progress, make decisions visible, and turn the final review into useful learning for everyone involved.', '492B531D373649D1A5DB12C65CE229E6_CB1EDEB2EDBA4E7F917897686DD0C237_008-extended-teaser-4-3-benefits-hocketse', 'A girl enjoys a bungee trampoline at the Porsche employee party.'),
    ],
  },
  {
    name: 'Ways of working',
    cards: [
      card('Collaborate across locations', 'Discuss how you maintain effective communication when colleagues or partners work in different locations. Share the tools and routines that help you keep briefs, approvals, and decisions clear.', 'F88D408C04A04A188CC04CBC2294DBB1_7E004E3F86CE48B0B05BBFD4F9C11D7C_008-extended-teaser-4-3-perks-discounts-mobile-working', 'A Porsche employee working from home.'),
      card('Plan around campaign demands', 'Explain how you organise your work around launches, production schedules, and live moments. Use the conversation to ask about working arrangements and any event or travel requirements associated with the position.', '31474CCE98BC43A48B51429A79D803BF_354163E238FB474691601DBBCEDBCF7C_008-extended-teaser-4-3-perks-discounts-flexible-working', 'A family beside a red Cayenne Turbo Coupé on the promenade.'),
      card('Create continuity in the team', 'Discuss how you document plans, prepare handovers, and build resilience into a publishing schedule. Explain how you make sure the work can continue smoothly when priorities change or a colleague is away.', 'E7FCE0DCCE3E482282137A33A79FB9A5_27D51D83B3D142FFB85487E0A7DE7977_008-extended-teaser-4-3-perks-discounts-sabbatical', 'A father and child at a lakeside house beside a blue 911 Carrera 4S.'),
    ],
  },
  {
    name: 'Benefits & development',
    cards: [
      card('Discuss the overall package', 'Use the interview to understand the compensation and benefits associated with the specific position. Share what matters to you and ask your recruitment contact to clarify the applicable terms and eligibility.', '168B53B84417438E8D18808EDB1D991D_9932D1721A3743C5AF68B21D60E7418C_008-extended-teaser-4-3-benefits-corporate-benefits', 'Corporate benefits lettering.'),
      card('Explore your development goals', 'Consider the capabilities you want to strengthen in your next role, from creative leadership to measurement or channel strategy. Ask about feedback, learning, and opportunities to broaden your experience.', 'DA3BFEFCBC2E41B9AFF37B719A5A58FA_81AD9F123E4F489F86A5EB4A605F0549_008-extended-teaser-4-3-benefits-porsche-lifestyle', 'Models and a shop displaying Porsche Lifestyle clothing.'),
      card('Clarify practical arrangements', 'Bring questions about the role’s location, working pattern, equipment, and onboarding. Your recruitment contact can explain which arrangements apply and what to expect if the interview process progresses.', 'D17F32A93848476C82299ADC625DE5BB_F0A6D86E2A7E435398035AB3273B5D05_008-extended-teaser-4-3-benefits-parcel-stations', 'A woman in a red jacket at a yellow DHL parcel station.'),
    ],
  },
  {
    name: 'Your first priorities',
    cards: [
      card('Listen and understand', 'Describe how you would approach your first weeks in a new social media role. Consider the people you would meet, the questions you would ask, and how you would build an informed view of the brand, audience, and existing programme.', 'E9D28F9CC21A461F9E58E54F186853B6_3A9FFEBC816B42719BABF823EC3BA8ED_008-extended-teaser-4-3-vehicle-leasing-porsche-leasing', 'A blue Porsche Cayenne in front of a Porsche Centre.'),
      card('Review and prioritise', 'Explain how you would assess current channels, content, workflows, and reporting. Discuss how you would distinguish a useful early improvement from an issue that needs more research or a wider strategic decision.', '96C714364669414FA22B8343D7267EED_210CAC1884A84538A88B903AC9C2F481_008-extended-teaser-4-3-vehicle-leasing-vw-leasing', 'A white Volkswagen Polo GTI on a country road.'),
      card('Align on a focused plan', 'Outline how you would agree priorities with your manager and collaborators. Consider a realistic plan for testing, delivery, and measurement, with clear ownership and regular opportunities to review progress.', '96C167A494AE415A9BCFFD32CA3B0D93_CD172EC9776C403F89B3C84152844F60_008-extended-teaser-4-3-vehicle-leasing-vehicle-purchase', 'A woman in a green suit beside a blue Porsche Taycan in the city.'),
    ],
  },
];

export const workingCards = [
  { ...card('A brand with a clear identity', 'Consider how Porsche’s heritage and attention to detail can inform contemporary social storytelling.', 'ECA979246EA44A94BCA233030AEFC4AB_A26ED906E28543EFBC911C88755C5930_060_cross-link-teaser_16-9_WA18MODOD0001_2560x1440', 'The Porsche logo as a door handle at the entrance to a Porsche location.', '#benefits'), label: 'Explore brand strategy' },
  { ...card('Creative collaboration', 'Connect marketing, creative, and communications teams around clear briefs and shared campaign goals.', 'FF4E4A7F129545CAA7FC173B83B4C7E0_112AC5CA4BFC4A1299E08EC40F88D1EF_060_cross-link-teaser_16-9_3013_20_2560x1440', 'An open-space office designed for communication, collaboration and creativity.', `${base}working-environments/`), label: 'Explore the working environment' },
  { ...card('A community with passion', 'Bring curiosity and care to conversations with people who share a strong connection to the brand.', '666CCFECEB1D4C7A9ADD0A78C0D421CE_C7F952013F1F4AD7A0F1DC3F229B6426_060_cross-link-teaser_16-9_196_2560x1440', 'Porsche employees celebrate a Le Mans victory at Porscheplatz in Stuttgart.', `${base}culture/`), label: 'Discover the culture' },
  { ...card('Learning through insight', 'Build on feedback, campaign results, and new perspectives to develop your social marketing practice.', 'E5C8F888BF1949108724CFAEDCB21B4A_761792F6337D4C909AD6DD67E6F80861_060_cross-link-teaser_16-9_2560x1440_LearningLab', 'People taking part in a workshop in a Porsche office.', `${base}learning-development/`), label: 'Explore learning & development' },
  { ...card('Innovation in every story', 'Translate product innovation and design into relevant content with a clear audience perspective.', '644782E9FAD84B55840822C63A87211D_5E06D214715C4E35B76B684C20EA65C2_060_cross-link-teaser_3-4_1350x1800_Porsche-Tech-Driven-by-you', 'The interior of a Porsche Cayenne with a futuristic colour scheme.', '#interview-preparation'), label: 'Prepare your campaign examples' },
  { ...card('Content with a purpose', 'Combine editorial judgement, platform knowledge, and measurement to make each story count.', '811D2ED88365480C8E8B9EC8C2965633_D342C4E08CB24D98BFC83A3715D0F29E_060_cross-link-teaser_16-9_2560x1440_Startbild-Inside-Porsche', 'A Porsche employee films a gaming talk on his mobile phone.', '#entry-opportunities'), label: 'Review your responsibilities' },
];
