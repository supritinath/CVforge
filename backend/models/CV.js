const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    github: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
      trim: true,
    },

    leetcode: {
      type: String,
      trim: true,
    },

    portfolio: {
      type: String,
      trim: true,
    },

    professionalTitle: {
      type: String,
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
    },

    education: {
      type: Array,
      default: [],
    },

    skills: {
      type: Array,
      default: [],
    },

    projects: {
      type: Array,
      default: [],
    },

    experience: {
      type: Array,
      default: [],
    },

    certifications: {
      type: Array,
      default: [],
    },

    achievements: {
      type: Array,
      default: [],
    },

    languages: {
      type: Array,
      default: [],
    },

    interests: {
      type: Array,
      default: [],
    },

    hobbies: {
      type: Array,
      default: [],
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    selectedTemplate: {
      type: String,
      default: "classic",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CV", cvSchema);