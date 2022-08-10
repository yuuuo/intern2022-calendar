import { useState } from "react";
import {
  Center,
  HStack,
  Box,
  Button,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import type { ImageProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  const MotionImage = motion<Omit<ImageProps, "transition">>(Image);
  return (
    <Center
      sx={{
        width: "100vw",
        height: "100vh",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Box>
        <HStack justify="center">
          <Link
            as="a"
            href="https://vitejs.dev"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/vite.svg"
              p={6}
              sx={{ willChange: "filter", height: "6em" }}
              _hover={{ filter: "drop-shadow(0 0 2em #646cffaa)" }}
              alt="Vite logo"
              m={0}
            />
          </Link>
          <Link
            as="a"
            href="https://reactjs.org"
            target="_blank"
            rel="noreferrer"
          >
            <MotionImage
              as={motion.img}
              animate={{ transform: ["rotate(0deg)", "rotate(360deg)"] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              src={reactLogo}
              p={6}
              sx={{ willChange: "filter", height: "6em" }}
              _hover={{ filter: "drop-shadow(0 0 2em #646cffaa)" }}
              alt="React logo"
            />
          </Link>
        </HStack>
        <Heading as="h1">Vite + React</Heading>
        <Box p={8}>
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <Text>
            Edit <code>src/App.tsx</code> and save to test HMR
          </Text>
        </Box>
        <Text sx={{ color: "#888" }}>
          Click on the Vite and React logos to learn more
        </Text>
      </Box>
    </Center>
  );
}

export default App;
