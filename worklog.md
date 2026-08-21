---
Task ID: 1
Agent: Main
Task: Fix code visible below footer on mobile + verify hidden apps are visible

Work Log:
- Analyzed user screenshot using OCR (VLM was timing out)
- OCR revealed Contentsquare script code rendering as visible text: `<Script id="contentsquare-init" strategy="afterInteractive" src={...}>`
- Found root cause in Analytics.tsx: Contentsquare and Hotjar scripts used JavaScript template literal syntax (`${...}`) inside JSX, which rendered them as text strings instead of React `<Script>` components
- Fixed by replacing template literals with proper JSX conditional rendering: `{CONTENTSQUARE_ID && (<Script .../>)}`
- Verified the 4 hidden apps (goal-system, identity-recode-system, journal-system, worksheets) were already present in appsData and translations
- Built and deployed the site
- Verified with browser agent that no code text appears below footer

Stage Summary:
- Fixed Analytics.tsx Contentsquare & Hotjar template literal bug
- 4 hidden apps already visible on /apps page
- Site rebuilt and deployed successfully

