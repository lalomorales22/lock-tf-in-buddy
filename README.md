
# LockTFin - Focus Session Manager

![Screenshot 2025-06-01 at 2 01 27 PM](https://github.com/user-attachments/assets/4d7c9129-58d8-4f92-ae77-d80b524be04f)


## About LockTFin

LockTFin is a beautiful, intuitive focus session manager designed to help you maintain productivity by managing your application access during focused work sessions. With its clean, rounded interface and comprehensive session tracking, LockTFin makes it easy to stay on task.

### Key Features

- 🎯 **App Selection & Management** - Choose which applications to allow during focus sessions
- ⏱️ **Customizable Timer** - Set focus sessions from 5 minutes to 4 hours
- 📊 **Session Statistics** - Track your focus time, completion rates, and productivity trends
- 🔒 **Focus Mode Simulation** - Experience a realistic focus environment (web prototype)
- 💾 **Session Logging** - Automatic saving of all focus sessions with detailed analytics
- 🎨 **Beautiful UI** - Clean, modern interface with smooth animations

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/lalomorales22/window-whisper-time.git

# Step 2: Navigate to the project directory.
cd window-whisper-time

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React** - Component-based UI framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Future Development

This web prototype demonstrates the core UX and features of LockTFin. For production use with real application blocking capabilities, the app would need to be converted to a native macOS application using Swift/Xcode with proper system permissions for:

- Application control and blocking
- File system access for app selection
- Global keyboard shortcut handling
- System-level focus management

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6ae09e0f-736b-4b32-b238-1780c5892bb8) and click on Share → Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
