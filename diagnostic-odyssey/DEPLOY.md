# Deploy to Vercel — Step by Step

## 1. Push to GitHub
```bash
cd diagnostic-odyssey
git init
git add .
git commit -m "Initial commit — Diagnostic Odyssey Ender"
# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/diagnostic-odyssey.git
git push -u origin main
```

## 2. Deploy on Vercel
1. Go to vercel.com → Sign in with GitHub
2. Click "Add New Project"
3. Import your `diagnostic-odyssey` repo
4. Click "Deploy" (Vercel auto-detects Next.js)

## 3. Add your HuggingFace Token
1. In Vercel → Your Project → Settings → Environment Variables
2. Add: Name = `HF_TOKEN`, Value = your HuggingFace token
3. Click Save → then Redeploy

## Done!
Your app is live at: https://diagnostic-odyssey.vercel.app
