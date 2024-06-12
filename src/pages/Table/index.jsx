import React, { useState } from "react";
import { Button, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Pagination } from "react-vant";
import { HashLoader } from "react-spinners";
import { toShortAddress } from "@/utils/common";
import api from "@/api";

const Table = () => {
	const [list, setList] = useState([]); // State to store the list of users
	const [page, setPage] = useState(1); // State to track the current page
	const [total, setTotal] = useState(10); // State to track the total number of items
	console.log(page);

	// Function to fetch the table data from the API
	const getTable = async () => {
		const res = await api.get(`/user/list`, {
			params: {
				pageNumber: page,
				pageSize: 15,
			},
		});

		console.log(res);
		if (res?.code === 200) {
			setTotal(res.data?.total || 10); // Set total items from the response
			setList(res.data?.users || []); // Set list of users from the response
		}
	};

	// Fetch the table data whenever the page changes
	useEffect(() => {
		getTable();
	}, [page]);

	return (
		<VStack h="100vh" w="100vw" bg="#f7f8fc" color="#000" p="20px">
			<Text py={2} fontWeight="600" fontSize="20px">
				Users Airdrop List
			</Text>
			<Box
				mt="20px"
				w="1000px"
				boxShadow="0 2px 12px 0 rgba(0, 0, 0, 0.1)"
				lineHeight="20px"
				fontSize="15px"
			>
				{list.length > 0 && (
					<Flex
						w="full"
						cursor="pointer"
						fontFamily="math"
						h="35px"
						px="20px"
						alignItems="center"
						bg="blackAlpha.400"
					>
						<Text w="10%" pl="10px">
							Index
						</Text>
						<Text w="15%" pl="10px">
							UserName
						</Text>
						<Text w="45%" textAlign="center">
							Address
						</Text>
						<Text w="15%" textAlign="center">
							Status
						</Text>

						<Text w="10%" textAlign="right">
							Reward
						</Text>
					</Flex>
				)}
				{/* Map through the list of users and display each user's information */}
				{list.map((item, index) => {
					return (
						<Flex
							w="full"
							px="20px"
							h="35px"
							key={index}
							alignItems="center"
							cursor="pointer"
							fontFamily="math"
							_hover={{ bg: "blackAlpha.200" }}
						>
							<Flex w="10%" pl="15px">
								{index + 1}
							</Flex>
							<Flex w="15%" pl="15px">
								{item?.username || "--"}
							</Flex>

							<Text w="45%" textAlign="center">
								{item?.address ? toShortAddress(item.ton_address, 20) : "--"}
							</Text>

							<Text w="15%" textAlign="center">
								Loggedin,
								{item?.is_first_claimed === 0 ? " Ongoing" : " Completed"}
							</Text>

							<Text w="10%" textAlign="right">
								{"--"}
							</Text>
						</Flex>
					);
				})}
			</Box>
			<Flex w="1000px">
				{list.length > 0 ? (
					<Flex pt="10px" className="rank-page" w="full" justify="flex-end">
						<Pagination
							forceEllipses
							value={page}
							onChange={setPage}
							prevText="Prev"
							nextText="Next"
							totalItems={total}
							showPageSize={3}
						/>
					</Flex>
				) : (
					<VStack
						w="full"
						py="100px"
						boxShadow="0 2px 12px 0 rgba(0, 0, 0, 0.1)"
					>
						<HashLoader color="#36d7b7" />
					</VStack>
				)}
			</Flex>
		</VStack>
	);
};

export default Table;
