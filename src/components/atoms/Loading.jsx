
import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./generic";
import "./style.css";

const Example = () => (
  <Section>
    <Title>ESFOT</Title>
    {list.map(l => (
      <Article key={l.prop}>
        <ReactLoading type={l.prop} color="#cf3a2b" />
        <Prop>{l.name}</Prop>
      </Article>
    ))}
  </Section>
);

export default Example;