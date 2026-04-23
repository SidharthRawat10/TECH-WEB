export const categories = [
  "AC",
  "Refrigerator",
  "Airfryer",
  "MacBooks",
  "Washing Machines",
  "Geyser",
  "External SSD"
];

export const products = {
  "AC": {
    introText: "Firstly, it's very important for you to know which will work better for you: a split AC or a window AC. Many people don't know about this, but I'd love to explain it briefly. Honestly, both have different use cases. For example, a window AC is good for you if you live on the 1st or 2nd floor, but it should not be the top floor. Window ACs do not come with 4-way swing, so they don't cool the room as quickly and they consume more electricity. In the case of split ACs, they are more preferable because they come with 4-way swing and cool the room much faster.",
    items: [
      {
        name: "Daikin 1.5 Ton 5 Star AC",
        description: "Experience premium cooling with Daikin's advanced split AC technology.",
        image: "/images/ac_placeholder.png",
        link: "https://amzn.to/42s18C0"
      },
      {
        name: "Panasonic 1.5 Ton AC",
        description: "Smart cooling, energy efficiency, and superior air purification.",
        image: "/images/ac_placeholder.png",
        link: "https://amzn.to/4cCTg5w"
      },
      {
        name: "Blue Star 1.5 Ton 5 Star AC",
        description: "High cooling performance with excellent energy savings and durability.",
        image: "/images/ac_placeholder.png",
        link: "https://amzn.to/4sO5A8W"
      }
    ],
    essentials: [
      {
        name: "Voltage Stabilizer for AC",
        description: "Protect your AC from voltage fluctuations and extend its lifespan.",
        link: "https://amzn.to/4eCwYn1"
      },
      {
        name: "Outdoor Unit Stand",
        description: "Durable and weather-resistant stand for safe installation of your AC's outdoor unit.",
        link: "https://amzn.to/4mKojkk"
      }
    ]
  },


  "Refrigerator": {
    introText: "",
    sections: [
      {
        title: "Best Under 15k",
        items: [
          {
            name: "Samsung 189 L, 5 Star, Digital Inverter",
            description: "Direct-Cool Single Door Refrigerator (RR21H2H25UZ/HL) - High energy efficiency with a powerful digital inverter.",
            image: "/images/fridge_placeholder.png",
            link: "https://amzn.to/3OYytBz"
          },
          {
            name: "LG 185 L, 5 Star, Smart Inverter",
            description: "Direct Cool Single Door Refrigerator (GLD1956ZAPZ, Shiny Steel, Base stand with Drawer) - Sleek design with smart cooling.",
            image: "/images/fridge_placeholder.png",
            link: "https://amzn.to/42n1iut"
          }
        ]
      },
      {
        title: "Best Double Door Under 30k",
        items: [
          {
            name: "Samsung 236L 3 Star Convertible NEW (Silver)",
            description: "Convertible double door refrigerator that offers flexible storage and powerful cooling.",
            image: "/images/double_door_fridge.png",
            link: "https://amzn.to/4sUNORJ"
          },
          {
            name: "Whirlpool 235L 2 Star NEW",
            description: "Spacious and efficient cooling with advanced technology for long-lasting freshness.",
            image: "/images/double_door_fridge.png",
            link: "https://amzn.to/4sUNWAH"
          }
        ]
      }
    ]
  },
  "Airfryer": {
    introText: "",
    items: [
      {
        name: "PHILIPS Air Fryer NA231/00 (6.2 Liter)",
        description: "Touch panel, uses up to 90% less fat, 1700W, Extra Large size with Cooking window and Rapid Air Technology.",
        image: "/images/airfryer_placeholder.png",
        link: "https://amzn.to/4u4YDBz"
      },
      {
        name: "PHILIPS Air Fryer HD9200/90 (4.1 Liter)",
        description: "Uses up to 90% less fat, 1400W, Large size with Rapid Air Technology for perfect crispy results.",
        image: "/images/airfryer_placeholder.png",
        link: "https://amzn.to/4mQ3nsA"
      }
    ]
  },


  "MacBooks": {
    introText: "",
    items: [
      {
        name: "Apple 2026 MacBook Air 13″ Laptop with M5 chip",
        description: "AI and Apple Intelligence, 34.46 cm (13.6″) Liquid Retina Display, 16GB Unified Memory, 512GB SSD Storage, 12MP Center Stage Camera, Touch ID; Midnight",
        image: "/images/macbook_placeholder.png",
        link: "https://amzn.to/3QhLRBg"
      },
      {
        name: "[Waiting for product details...]",
        description: "Placeholder for the second MacBook.",
        image: "/images/macbook_placeholder.png",
        link: "#"
      }
    ]
  },
  "Washing Machines": {
    introText: `🔹 Front Load Washing Machine
Clothes are washed by tumbling (like professional laundries)
Uses less water & electricity
Better cleaning (especially for tough stains)
Gentle on clothes → lasts longer
Takes more time
Costly 💸

👉 Best for:
People who want deep cleaning
Small families / couples
Those who care about saving water & power long-term
If you’re okay spending more upfront

🔹 Top Load Washing Machine
Clothes are washed using a rotating agitator/pulsator
Uses more water
Cleaning is decent but not as strong
Faster ⏱️
Cheaper 💰
Easier to use (no bending)

👉 Best for:
Budget buyers
Families who want quick washing
Elderly people (no bending needed)
Places with water not an issue

⚖️ Final Verdict
Want premium + best cleaning + efficiency → Go Front Load`,
    sections: [
      {
        title: "Best Front Load Washing Machines",
        items: [
          {
            name: "Samsung 9 kg, 5 star, AI EcoBubble",
            description: "Super Speed, Wi-Fi, Hygiene Steam with Inbuilt Heater, Digital Inverter, Fully-Automatic Front Load Washing Machine (WW90DG5U24AXTL, Inox)",
            image: "/images/washing_machine_placeholder.png",
            link: "https://amzn.to/4sQks6W"
          },
          {
            name: "Bosch 9 kg 5 Star Front Load",
            description: "AI ActiveWater, 14 Wash Programs, Removes 99.9% Germs with Steam, No Tangle or Wrinkle, SoftCare Paddle, Black Grey, WGA1420TIN",
            image: "/images/washing_machine_placeholder.png",
            link: "https://amzn.to/4tDSk84"
          }
        ]
      },
      {
        title: "Best Top Load Washing Machines",
        items: [
          {
            name: "Samsung 9 kg, 5 star, Eco Bubble Technology",
            description: "Wi-Fi, Soft Closing Door, Fully-Automatic Top Load Washing Machine (WA90BG4542BDTL, Versailles Gray)",
            image: "/images/top_load_washing_machine.png",
            link: "https://amzn.to/4n4Bi0N"
          },
          {
            name: "Whirlpool 8 Kg 5 MAGIC CLEAN PRO SW H",
            description: "Fully Automatic Top Load Washing Machine (MAGIC CLEAN PRO SW H KG GREY 10YMW with In-Built Heater)",
            image: "/images/top_load_washing_machine.png",
            link: "https://amzn.to/4mLIRJu"
          }
        ]
      }
    ]
  },
  "Geyser": {
    introText: "",
    items: [
      {
        name: "Bajaj New Shakti Neo 25L",
        description: "Reliable and highly durable storage water heater with titanium glasslined enamel coated mild steel tank.",
        image: "/images/geyser_placeholder.png",
        link: "https://amzn.to/496lCnF"
      },
      {
        name: "Crompton Arno Neo 15-L 5 Star Rated Storage Water Heater",
        description: "Advanced 3 Level Safety, National Energy Conservation Award Winner 2023.",
        image: "/images/geyser_placeholder.png",
        link: "https://amzn.to/4sLYAcZ"
      }
    ]
  },
  "External SSD": {
    introText: "",
    items: [
      {
        name: "SANDISK Extreme 1TB Portable External SSD",
        description: "1050MB/s R, 1000MB/s W, 3m Drop Protection, IP65 Water/dust Resistant, PC, MAC & TypeC Smartphone Compatible.",
        image: "/images/ssd_placeholder.png",
        link: "https://amzn.to/4eEz1a5"
      },
      {
        name: "Samsung T9 Portable External SSD 1TB",
        description: "USB 3.2, Speed up to 2,000 MB/s Read Speed, Storage for Professional Creators - videographers, Graphic Designers, Artists.",
        image: "/images/ssd_placeholder.png",
        link: "https://amzn.to/4mQC8y4"
      }
    ]
  }
};
