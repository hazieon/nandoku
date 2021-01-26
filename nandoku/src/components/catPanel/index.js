import { Box, Text, Center, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

function CatPanel({ link, title, myClass, src, alt, id, score }) {
  return (
    <Center>
      <VStack className={styles.container}>
        <Box className={styles.box}>
          <Link to={link}>
            <p className={styles.categoryName}>{title}</p>
            {/* <img className={myClass} src={src} alt={alt} /> */}
          </Link>
        </Box>
        <Box className={styles.textBox}>
          <Text id={id}>{score}%</Text>
          {/* <Text className={styles.textBox}>{subheading}</Text> */}
        </Box>
      </VStack>
    </Center>
  );
}
export default CatPanel;
