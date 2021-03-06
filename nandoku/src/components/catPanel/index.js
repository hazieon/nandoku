import { Box, Text, Center, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

function CatPanel({ title, alt, id, score }) {
  // console.log({ link }, { kanji }, { title });
  return (
    <Center>
      <VStack className={styles.container}>
        <Box className={styles.box}>
          <Link to={`/flashcardpanel/${title}`}>
            <p className={styles.categoryName}>{title}</p>
          </Link>
        </Box>
        <Box className={styles.textBox}>
          <Text id={id}>{score}</Text>
        </Box>
      </VStack>
    </Center>
  );
}
export default CatPanel;

//{ link, kanji, title, myClass, src, alt, id, score })
