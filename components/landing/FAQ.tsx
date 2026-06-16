"use client";

import { useState } from "react";
import Link from "next/link";

const faqData = [
  {
    question: "Do guests need to download an app to participate?",
    answer: "Nope, no apps or account registration are needed.\n\nUnlike other photo sharing apps, EverSnapz doesn't require this kind of effort from your guests. Guests can easily participate by entering a URL or scanning the unique QR code we generated for you. From there, the upload process is straightforward.\n\nIt's so simple to use that even grandma can do it. No Joke."
  },
  {
    question: "Can I download all guests' photos & videos?",
    answer: "Yes! You are able to download each photo or video individually, or use a batch download to obtain all files in a zipped folder. Then, you have the freedom to save them on your own storage, print them, or utilize them in any way you see fit. Guests can also download the photos and share on social media with ease (unless you turn it off)."
  },
  {
    question: "Why is it better than photo sharing apps?",
    answer: "Google Photos, Dropbox, chat groups, emails (or any other similar app) can be used to collect photos from your event , no doubt about it. However, the process of uploading on these apps is not always straightforward. There are often many screens and buttons to navigate, and sometimes it requires a login or app download. In addition, the customization options are very limited and the photos quality is reduced. Overall, it's not the best experience for your and for the average guest.\n\nThat's the very reason why we created EverSnapz - to simplify the process of collecting event photos and videos from your guests. We've made it easy and enjoyable, while adding cool features like a live slideshow, QR code access, and decorated text posts, just as an example.\n\nWhile these other apps may work, they could result in a sluggish experience and fewer photos. If you're okay with that, go for it (no sarcasm). But if you want you and your guests to have the best experience, give EverSnapz a try."
  },
  {
    question: "Can I print the QR code on signs?",
    answer: "Yes! Lots of event hosts do that. Print the QR and put on tables or on a sign in the entrance (\"Scan Me!\" kind of signs). Guests can then scan the QR code to upload photos to your digital album with ease."
  },
  {
    question: "My event is more than one day, can I use EverSnapz?",
    answer: "Yes! We support events that span for multiple days. Check out our available plans and choose a plan that matches the duration of your event."
  },
  {
    question: "How do I use the Photo Wall?",
    answer: "The Photo Wall is a live slideshow that displays all uploads made by your guests such as photos, videos, and text posts. It updates in real-time with every new upload. While it's not mandatory to use it for collecting photos from your guests, if you want to add some interactivity to your event, we highly recommend it!\n\nThe Photo Wall can be accessed through a web link, which means it can run on any device with a browser and internet connection. You can then connect it to projectors, smart TVs, tablets, etc. via cable or casting capabilities like Chromecast or Apple TV."
  },
  {
    question: "Are my photos private?",
    answer: "Your uploads are private and will only be shared with those you choose. We do not use, own, or interact with your photos in any way. Your photos are solely yours."
  },
  {
    question: "We already have a photographer, should we use it?",
    answer: "Your photographer is undoubtedly going to capture amazing moments during your event, but it's impossible for them to be everywhere. Your guests can also take valuable photos that give you an opportunity to see an authentic side of your event, captured by your friends and family.\n\nAdditionally, your photographer can upload the photos they take during the event, which will also appear on the photo wall/digital guestbook. How cool is that?\n\nAlthough not intended as a substitute for a professional photographer, some couples have found EverSnapz to be a budget-friendly alternative for their event."
  },
  {
    question: "What if an inappropriate photo is shared?",
    answer: "Our system automatically detects most of the inappropriate photos. Moreover, you can always delete any photo or video manually using your dashboard which can be accessed from any phone with your account.\n\nIn our experience (of 50,000+ events), guests do behave and respect the event owners. However, if you're running a big public event (like a conference) and concerned of misbehaving of random people in the event, you can always turn on the moderation feature so every upload must be approved by you first (unless it comes from people you trust)."
  },
  {
    question: "Does this work anywhere in the world?",
    answer: "Yes, our app works globally. All your guests need is an internet connection."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-[100px] border-t border-border-color" id="faq">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-[100px]">
          <div className="flex-1">
            <h2 className="text-[2.5rem] font-extrabold tracking-tight mb-4">Questions?</h2>
            <p className="text-lg text-gray-text mb-10 leading-relaxed">
              Everything you need to know about the product. Can&apos;t find the answer you&apos;re looking for? Please chat to our team. Ready to go? Click the button below!
            </p>
            <Link href="/signup" className="btn btn-primary px-8 py-3.5 text-lg">
              I'm ready to start!
            </Link>
          </div>
          
          <div className="flex-[1.5] flex flex-col gap-4">
            {faqData.map((item, index) => (
              <div key={index} className="border border-border-color rounded-xl overflow-hidden">
                <button
                  className="w-full py-5 px-6 text-left text-base font-bold text-dark-text flex justify-between items-center hover:bg-light-lavender/30 transition-colors gap-6"
                  onClick={() => toggle(index)}
                >
                  {item.question}
                  <span className={`transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`}>
                    <i className="fa-solid fa-chevron-down text-sm"></i>
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-[1000px] p-6 pt-0 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[15px] text-gray-text leading-relaxed whitespace-pre-line">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
