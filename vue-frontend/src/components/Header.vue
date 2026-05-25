<script setup>
import logo from "../assets/logo practice.svg";

import { Avatar, Dropdown } from "frappe-ui";

const options = [
	{
		label: "Go to Desk",
		onClick: () => {
			window.location.href = "http://simple.localhost:8000/app";
		},
	},
];
</script>

<template>
	<div class="flex items-center justify-between border-b px-6 py-4">
		<div class="flex items-center gap-3">
			<img :src="logo" class="h-10" />

			<h1 class="text-xl font-bold">Ticket Dashboard</h1>
		</div>

		<Dropdown :options="options">
			<Avatar
				image="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=200"
				size="2xl"
				class="cursor-pointer"
			/>
		</Dropdown>
	</div>
</template>
