"use client";
import React from "react";
import { ExpandImageEffect } from "@/components/Expanding1";
import { ExpandImageEffectCenter } from "@/components/Expanding-2";
import { ExpandImageEffectRight } from "@/components/Expanding-3";
import { InViewImagesGrid } from "@/components/ImageGrid";

const App: React.FC = () => {
	return (
		<div className="w-full  flex items-center flex-col pt-32">
			<ExpandImageEffect
				imageUrl="/yippe.gif"
				projectNumber="1"
				text="This is the Visual Effect "
				expandText="I made."
			/>

			<ExpandImageEffectCenter
				imageUrl="/yippe.gif"
				projectNumber="2"
				beforeText="The feeling Of Growth,"
				centerLeftText="bloom"
				centerRightText="and dance"
				afterText="under the stars."
				description="In this dance, even the stars, those ancient sentinels of the night sky, are not stationary but in perpetual motion"
			/>

			<ExpandImageEffectRight
				imageUrl="/yippe.gif"
				projectNumber="3"
				line1="Let the miles unfurl"
				line2="like stories each"
				line3="one a breath in the"
				line4="saga of the soul."
				description="As we delve deeper into the mysteries of the cosmos, we encounter the profound realization that the universe itself breathes in a rhythm of creation and dissolution, a cosmic dance that mirrors the cycles of life and death on our own planet. Stars are born from the dust, shining fiercely against the dark, only to eventually fade or explode in a dazzling finale, their remnants seeding future stars, planets, and perhaps, life itself. This celestial cycle reflects the very essence of the Dao, emphasizing the interconnectedness of all things, the perpetual motion and transformation that is the hallmark of existence."
			/>

			<div className="w-full min-h-[300vh] ">
				<InViewImagesGrid />
			</div>
		</div>
	);
};

export default App;
