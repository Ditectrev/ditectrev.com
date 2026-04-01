import { Component } from "@angular/core";
import { MethodologyStageItem } from "../../interfaces";
import { SharedModule } from "../shared.module";

/**
 * @component MethodologyComponent
 * @description Create the component.
 */
@Component({
  selector: "app-methodology",
  templateUrl: "./methodology.component.html",
  styleUrls: ["./methodology.component.scss"],
  standalone: true,
  imports: [SharedModule],
})
export class MethodologyComponent {
  // Array of arrays to hold all stages with all steps related to each stage.
  public stageItems: MethodologyStageItem[][] = [
    [
      // First stage of Methodology.
      {
        name: "Business Analysis",
        nextStageCount: "Second",
        previousStageCount: "",
        stageCount: "First",
        stageDescription: "listening and asking question",
        stepCount: "First",
        stepDescription:
          "Learn about your project, try to understand its business needs and ask questions.",
        stepIcon: "looks_one",
      },
      {
        name: "Business Analysis",
        nextStageCount: "Second",
        previousStageCount: "",
        stageCount: "First",
        stageDescription: "listening and asking question",
        stepCount: "Second",
        stepDescription:
          "Find your differentiators and unique value proposition.",
        stepIcon: "looks_two",
      },
    ],
    // Second stage of Methodology.
    [
      {
        name: "Research",
        nextStageCount: "Third",
        previousStageCount: "First",
        stageCount: "Second",
        stageDescription: "researching business and technical capabilities",
        stepCount: "First",
        stepDescription:
          "Investigate your business needs and combine them with a technical realities.",
        stepIcon: "looks_one",
      },
      {
        name: "Research",
        nextStageCount: "Third",
        previousStageCount: "First",
        stageCount: "Second",
        stageDescription: "researching business and technical capabilities",
        stepCount: "Second",
        stepDescription:
          "Find a golden ratio for business needs and technical realities.",
        stepIcon: "looks_two",
      },
      {
        name: "Research",
        nextStageCount: "Third",
        previousStageCount: "First",
        stageCount: "Second",
        stageDescription: "researching business and technical capabilities",
        stepCount: "Third",
        stepDescription: "Provide you a feedback what we can do.",
        stepIcon: "looks_3",
      },
      {
        name: "Research",
        nextStageCount: "Third",
        previousStageCount: "First",
        stageCount: "Second",
        stageDescription: "researching business and technical capabilities",
        stepCount: "Fourth",
        stepDescription:
          "Estimate range of the project in terms of budget and deadline.",
        stepIcon: "looks_4",
      },
    ],
    // Third stage of Methodology.
    [
      {
        name: "Technical Assessment",
        nextStageCount: "Fourth",
        previousStageCount: "Second",
        stageCount: "Third",
        stageDescription:
          "evaluation technical possibilities with certain budget",
        stepCount: "First",
        stepDescription: "Determine the budget.",
        stepIcon: "looks_one",
      },
      {
        name: "Technical Assessment",
        nextStageCount: "Fourth",
        previousStageCount: "Second",
        stageCount: "Third",
        stageDescription:
          "evaluation technical possibilities with certain budget",
        stepCount: "Second",
        stepDescription: "Analysis what kind of technologies and tools to use.",
        stepIcon: "looks_two",
      },
      {
        name: "Technical Assessment",
        nextStageCount: "Fourth",
        previousStageCount: "Second",
        stageCount: "Third",
        stageDescription:
          "evaluation technical possibilities with certain budget",
        stepCount: "Third",
        stepDescription:
          "Propose a solution according to your needs and budget.",
        stepIcon: "looks_3",
      },
    ],
    // Fourth stage of Methodology.
    [
      {
        name: "Realization",
        nextStageCount: "Fifth",
        previousStageCount: "Third",
        stageCount: "Fourth",
        stageDescription: "execution for the project",
        stepCount: "First",
        stepDescription: "Start with small part of the project.",
        stepIcon: "looks_one",
      },
      {
        name: "Realization",
        nextStageCount: "Fifth",
        previousStageCount: "Third",
        stageCount: "Fourth",
        stageDescription: "execution for the project",
        stepCount: "Second",
        stepDescription: "Finish the small part of the project.",
        stepIcon: "looks_two",
      },
      {
        name: "Realization",
        nextStageCount: "Fifth",
        previousStageCount: "Third",
        stageCount: "Fourth",
        stageDescription: "execution for the project",
        stepCount: "Third",
        stepDescription: "Apply your remarks.",
        stepIcon: "looks_3",
      },
      {
        name: "Realization",
        nextStageCount: "Fifth",
        previousStageCount: "Third",
        stageCount: "Fourth",
        stageDescription: "execution for the project",
        stepCount: "Fourth",
        stepDescription:
          "Iterate these steps for yet another parts of the project.",
        stepIcon: "looks_4",
      },
    ],
    // Fifth stage of Methodology.
    [
      {
        name: "Further Cooperation",
        nextStageCount: "",
        previousStageCount: "Fourth",
        stageCount: "Fifth",
        stageDescription: "long term partnership",
        stepCount: "First",
        stepDescription: "Support you with what we delivered.",
        stepIcon: "looks_one",
      },
      {
        name: "Further Cooperation",
        nextStageCount: "",
        previousStageCount: "Fourth",
        stageCount: "Fifth",
        stageDescription: "long term partnership",
        stepCount: "Second",
        stepDescription: "Further improvements.",
        stepIcon: "looks_two",
      },
    ],
  ];
}
