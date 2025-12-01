# Worksy

[![Netlify Status](https://api.netlify.com/api/v1/badges/e73ba7da-985d-4222-a8f2-922c374655b2/deploy-status)](https://app.netlify.com/projects/v58-tier3-team-33/deploys)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7770ab88-8ff9-499e-a967-13faa2b35b18/deploy-status)](https://app.netlify.com/projects/server-v58-tier3-team-33/deploys)

Your project's `readme` is as important to success as your code. For
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point -
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!

## Demo

🚀 **Try it live:** [Worksy](https://v58-tier3-team-33.netlify.app/)

## Dependencies

To run the project locally, you will need:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [pgAdmin](https://www.pgadmin.org/) as a postgres GUI

## Folder Structure

```txt
root/
├── README.md
├── package-lock.json
├── package.json
└── apps/
    ├── client/
    |   ├── package.json
    │   └── src/
    │       └── main.tsx
    └── server/
        ├── package.json
        └── src/
            └── server.ts
```

## Dev Setup

1. Install dependencies

   ```sh
   # from the root of the repo
   npm ci
   ```

2. Create a copy of `.env.example` called `.env` for each app and fill the value for each environment variable.

3. [start the local database server](https://www.postgresql.org/docs/current/server-start.html). If this is your fist time:
   - [add a new server](https://www.pgadmin.org/docs/pgadmin4/latest/user_interface.html) with default settings and `localhost` as hostname
   - [create a database](https://www.pgadmin.org/docs/pgadmin4/latest/managing_cluster_objects.html) called `test` using the database dialog

4. spin up client and server dev servers

   ```sh
   # from the root of the repo once again
   npm run client:dev
   npm run server:dev
   ```

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- snowbytes: [GitHub](https://github.com/snowbytes)
- Anthony Tibamwenda: [@AskTiba](https://github.com/AskTiba) / [LinkedIn](https://www.linkedin.com/in/tibamwenda-anthony-64144820b/)
- Adewale Agboke: [GitHub](https://github.com/Adewal246) / [LinkedIn](https://www.linkedin.com/in/adewaleagboke/)

- Tunde Ademola Kujore: [GitHub](https://github.com/Dhemmyhardy) / [LinkedIn](https://www.linkedin.com/in/tundeademolakujore/)

- Rachel Tipton: [GitHub](https://github.com/rachel-labri-tipton) / [LinkedIn](https://www.linkedin.com/in/rachel-labri-tipton/)

- Jannah Hardy: [LinkedIn](https://www.linkedin.com/in/jannah-hardy-b2369712b/)

- asiill: [GitHub](https://github.com/asiill)
