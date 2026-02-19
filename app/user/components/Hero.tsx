"use client";

import { Row, Col, Typography, Button } from "antd";
import Image from "next/image";
import styles from "./Hero.module.css";

const { Title, Paragraph } = Typography;

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <Row
          align="middle"
          gutter={[48, 48]}
          justify="space-between"
        >
          {/* LEFT CONTENT */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={styles.content}>
              <Title className={styles.title}>
                Everything You Need <br />
                <span className={styles.highlight}>
                  In One Store
                </span>
              </Title>

              <Paragraph className={styles.description}>
                Shop electronics, fashion, grocery, optical and more —
                all in one powerful platform built for your daily needs.
              </Paragraph>

              <Button
                size="large"
                className={styles.shopButton}
              >
                Shop Now
              </Button>
            </div>
          </Col>

          {/* RIGHT IMAGE */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={styles.imageWrapper}>
              <Image
                src="/banner.jpg"
                alt="store banner"
                width={600}
                height={500}
                className={styles.image}
                priority
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
