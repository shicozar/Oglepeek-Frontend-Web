import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Pagination from "../../Components/Pagination";
import ProductCard from "./ProductCard";
import ProdFilter from "./ProdFilter";
import ProdFrame from "./ProdFrame";
import { TbArrowsUpDown } from "react-icons/tb";
import { Box, Flex, Select, Switch, Text, Image } from "@chakra-ui/react";
import {
  Gender,
  FrameStyle,
  LensType,
  FrameMaterial
} from "./FilterDetails";

const NewProduct = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [types, setTypes] = useState("");
  // const [page, setPage] = useState(0);
  // const [sort, setSort] = useState("");
  // const [gender, setGender] = useState("");
  // const [productRef, setProductRef] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gender, setGender] = useState("");
  const [style, setStyle] = useState("");
  const [lens, setLens] = useState("");
  const [material, setMaterial] = useState("");

  const fetchproduct = async () => {
    setIsLoaded(true);
    try {
      const queryParams = new URLSearchParams({
        gender,
        style,
        lens,
        material
      }).toString();
  
      const response = await fetch(
        `http://localhost:8000/api/product?${queryParams}`
      );
      const postData = await response.json();
      setProducts(postData.products||[]);
      setIsLoaded(false);
    } catch (error) {
      console.log(error);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, [gender, style, lens, material]);

  // const handleClick = (value) => {
  //   setProductRef(value);
  // };

  // const handleClick2 = (value) => {
  //   setProductRef(value);
  // };

  return (
    <>
      <Navbar />
      <Box>
        <Image
          src="https://static1.lenskart.com/media/desktop/img/Mar23/spring/home/PLP%20Camapaign%20-%20WEB_1.jpg"
          alt="img"
          w="96%"
          m="auto"
        />
        <Flex m="0" px="2%" gap="4" cursor="pointer">
          <Flex
            w="17%"
            m={0}
            display={{ base: "none", xl: "inherit" }}
            flexDirection="column"
          >
            

            <ProdFilter
              type={Gender}
              heading="Gender"
              handlechange={setGender}
              val={gender}
              type1={FrameStyle}
              heading1="Style"
              handlechange1={setStyle}
              val1={style}
              type2={LensType}
              heading2="Lens"
              handlechange2={setLens}
              val2={lens}
            />
            <ProdFilter
              type={FrameMaterial}
              heading="Frame Material"
              handlechange={setMaterial}
              val={material}
              type1={[]}
              heading1=""
              handlechange1={() => {}}
              val1={""}
              type2={[]}
              heading2=""
              handlechange2={() => {}}
              val2={""}
            />

            <hr />
          </Flex>

          <Box
            overflow="scroll"
            w={{ xl: "82%", base: "100%" }}
            borderLeft="1px solid"
            borderColor="gray.300"
            m={0}
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p="7px"
              bg="#e2e8f0"
              borderColor="#ededed"
            >
              <Text fontSize="15px" color="gray.600" fontWeight="500">
                EYEGLASSES & SUNGLASSES
              </Text>
              <Flex
                alignItems="center"
                display={{ md: "inherit", base: "none" }}
              >
                <Text fontWeight="bold" mr="5px" color="green" fontSize="15px">
                  VIEW FRAMES
                </Text>
                <Switch colorScheme="green" isChecked size="lg" />
                <Text ml="5px" fontSize="15px">
                  VIEW 3D TRY ON
                </Text>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <TbArrowsUpDown color="green" fontWeight="bold" />
                  <Text fontWeight="bold" color="green" fontSize="15px">
                    SortBy
                  </Text>
                </Flex>
                <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  border="0.1px"
                  borderRadius="3px"
                  borderColor="black"
                  ml="4px"
                  p="0px"
                  fontSize="16px"
                  bg="whiteAlpha.900"
                >
                  <option value="">Select</option>
                  <option value="lowtohigh">Price : low to high</option>
                  <option value="hightolow">Price : high to low</option>
                </Select>
              </Flex>
            </Flex>
            {products.length !== 0 && (
              <Text mt="5px" textAlign="center" fontSize="15px">
                Showing {products.length} of 50 Results
              </Text>
            )}
            {isLoaded ? (
              <Loading />
            ) : products.length !== 0 ? (
              <ProductCard type={products} />
            ) : (
              <Text
                fontSize="28px"
                fontWeight="bolder"
                textAlign="center"
                color="gray"
                mt="5"
              >
                No Glasses Found
              </Text>
            )}
          </Box>
        </Flex>
        <Pagination current={page} onChange={(value) => setPage(value)} />
      </Box>
      <Footer />
    </>
  );
};

export default NewProduct;
