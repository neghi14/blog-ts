"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function FeedCard(props: object) {
  return (
    <div className="feed__item">
      <div className="item__body">
        <div className="body__author">
        <Image
          alt="user-profile"
          src="/images/test.jpg"
          width={32}
          height={32}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "100%",
            aspectRatio: "1/1",
          }}
          />
          <div className="body__author--details">
          <p className="author__name">Jon Doe</p>
          <p className="author__date">
            {dayjs(10 / 20 / 2023).format("MMM - DD")}
          </p>
          </div>
          
        </div>
        <h2 className="body__title">Lorem ipsum</h2>
        <div className="body__interactions">
          <div className="body__interactions--sub">
            <div className="interactions">
              <Image
                src="/svg/heart.svg"
                width={16}
                height={16}
                alt="heart svg"
              />
              <span className="text-sm">{5}</span>
            </div>
            <div className="interactions">
              <Image
                src="/svg/speech.svg"
                width={16}
                height={16}
                alt="heart svg"
              />
              <span className="text-sm">{15}</span>
            </div>
          </div>
          <div className="interactions">
              <Image
                src="/svg/bookmark.svg"
                width={16}
                height={16}
                alt="heart svg"
              />
              <span className="text-sm">{5}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
