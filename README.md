# 🐉 Dragon Ball Z: Fighter's Edition

![Dragon Ball Z: Fighter's Edition](https://img.shields.io/badge/BYOND-Game-orange) ![Status](https://img.shields.io/badge/Status-Open%20Source-green) ![Version](https://img.shields.io/badge/Version-2025-blue)

## 🌟 About

Dragon Ball Z: Fighter's Edition is a **Multi-User Dungeon (MUD)** that delivers an authentic Dragon Ball Z experience with a focus on **skill-based combat** and **interactive gameplay**. Built from the ground up using the **BYOND engine**, this project continues the legacy of classic DBZ MUDs while introducing modern features and a comprehensive web interface.

Unlike traditional RPGs where you watch numbers go up, DBZ:FE emphasizes **player skill**, **tactical combat**, and **meaningful character progression** where every action matters.

## ✨ Key Features

### 🥊 Combat System
- **Fully Interactive Combat**: Manual control over attacks, dodges, and counters
- **Skill-Based Mechanics**: Your reflexes and timing determine victory
- **Energy & Ki Management**: Strategic resource management during battles
- **Long-Range Combat**: Strike opponents from multiple rooms away
- **Transformation System**: Access iconic DBZ transformations with stat bonuses

### 🌍 World & Exploration
- **ASCII Map System**: Detailed terrain visualization with NPCs and players
- **Multiple Planets**: Earth, Namek, Vegeta, Frieza, and more
- **Gravity Training**: Planet-specific gravity affects training efficiency
- **Arena System**: Structured PvP with power level restrictions
- **Quest System**: Follow the DBZ saga from Raditz to Cell

### 🎮 Character Progression
- **No Traditional Levels**: Power Level increases through combat experience
- **Multiple Races**: Saiyan, Human, Namekian, Android, Icer, and more
- **Racial Abilities**: Unique powers and transformation paths
- **Skill Learning**: Learn techniques by defeating NPC masters
- **Equipment System**: Enhance your abilities with weapons and armor

### 🏠 Advanced Systems
- **Player Housing**: Build and customize your own bases
- **Shop System**: Buy, sell, and trade with NPC merchants
- **Dragon Ball Collection**: Gather the legendary orbs to make wishes
- **Community Features**: Rankings, events, and player interaction
- **Death Mechanics**: Meaningful consequences with afterlife system

## 🚀 Getting Started

### Prerequisites
- **BYOND Engine** (for running the game server)
- **Web Server** (Apache/Nginx for the web interface)
- **PHP 7.4+** (for web functionality)
- **SQLite** (database included)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/dbzfe_open.git
   cd dbzfe_open
   ```

2. **Set Up BYOND Server**
   ```bash
   # Install BYOND (Linux)
   wget http://www.byond.com/download/build/513/513.1551_byond_linux.zip
   unzip 513.1551_byond_linux.zip
   sudo make install
   
   # Start the game server
   DreamDaemon DBZFE.dmb -port 4000
   ```

3. **Set Up Web Interface**
   ```bash
   cd web
   php -S localhost:8080
   ```

4. **Connect to Game**
   - Use a MUD client (MUSHclient, Mudlet) to connect to `localhost:4000`
   - Or visit the web interface at `http://localhost:8080`

### Quick Start Guide

1. **Create Character**: Choose race, alignment, and starting stats
2. **Complete Tutorial**: Learn basic commands and combat
3. **Train & Fight**: Battle NPCs to increase power level
4. **Learn Skills**: Defeat masters to acquire new techniques
5. **Explore Universe**: Travel between planets and discover secrets

## 📁 Project Structure

```
dbzfe_open/
├── code/                   # BYOND game source code
│   ├── commands/          # Player commands
│   ├── mob/               # Player and NPC definitions
│   ├── misc/              # Game mechanics (transformations, skills)
│   ├── houseSystem/       # Player housing system
│   ├── questSystem/       # Quest and storyline system
│   └── ...               # Other game systems
├── web/                   # Web interface
│   ├── pages/            # Individual page content
│   ├── inc/              # Includes (navigation, etc.)
│   ├── modern-style.css  # Responsive styling
│   ├── modern-script.js  # Interactive features
│   └── index.php         # Main entry point
├── cfg/                   # Configuration files
├── rsc/                   # Game resources
├── worlds/               # Map and world data
├── DBZFE.dm             # Main BYOND project file
├── dbzfe.db             # SQLite database
└── README.md            # This file
```

## 🎯 Gameplay Highlights

### Race Selection
- **🔥 Saiyan**: Transformation masters with Zenkai ability
- **👤 Human**: Versatile fighters with balanced growth
- **🟢 Namekian**: Regeneration and magical abilities
- **🤖 Android**: Infinite energy and mechanical precision
- **🧊 Icer**: Multiple forms and devastating attacks
- **👽 Alien**: Balanced stats with unique techniques

### Transformation System
- **Super Saiyan Forms**: SSJ, SSJ2, SSJ3, LSSJ
- **Kaioken Levels**: x2 through x20 multipliers
- **Racial Forms**: Perfect Cell, Full Power Frieza, Giant Namekian
- **Mystic Powers**: Unlock hidden potential

### Combat Features
- **Manual Combat**: No auto-attack systems
- **Directional Attacks**: Target specific body parts
- **Energy Techniques**: Ki blasts, beams, and explosions
- **Combos & Counters**: Chain attacks and defensive maneuvers
- **Environmental Damage**: Destroy terrain with powerful attacks

## 🌐 Web Interface

The modern web interface provides:
- **📖 Complete Game Guide**: Races, skills, transformations
- **🗺️ Interactive Maps**: Planet layouts and locations
- **👥 Community Features**: Player rankings and social tools
- **📋 Command Reference**: Comprehensive command documentation
- **🏪 Shop Guides**: Trading and economy information
- **📱 Mobile Responsive**: Full functionality on all devices

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Areas for Contribution
- 🐛 Bug fixes and optimizations
- ✨ New features and systems
- 📝 Documentation improvements
- 🎨 Web interface enhancements
- 🌍 Translation support
- 🧪 Testing and quality assurance

## 🔧 Technical Details

### Built With
- **BYOND Engine**: Game server and logic
- **PHP**: Web interface backend
- **JavaScript**: Interactive web features
- **SQLite**: Database management
- **HTML5/CSS3**: Modern web standards

### System Requirements
- **Server**: Linux/Windows with 1GB+ RAM
- **Database**: SQLite (included)
- **Ports**: 4000 (game), 8080 (web)
- **Clients**: Telnet, MUD clients, or web browser

## 📞 Community & Support

- **Discord**: [Join our community](https://discord.gg/QynAjm2axA)
- **Issues**: Report bugs via GitHub Issues
- **Wiki**: Game documentation and guides
- **Forums**: Community discussions and updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Original Creators**: Trenton's DBZ:FE and Rcet's DBZ:Reality
- **BYOND Community**: For the excellent game engine
- **Contributors**: All developers who have contributed to this project
- **Players**: The community that keeps the game alive

## 🎮 Join the Fight!

Ready to become the legendary warrior? Connect now and start your Dragon Ball Z adventure!

```bash
# Quick start
git clone https://github.com/yourusername/dbzfe_open.git
cd dbzfe_open
./start.sh
```

**Fight. Train. Ascend. Become Legend.**

---

*Dragon Ball Z: Fighter's Edition - Where legends are born through skill, not luck.*
