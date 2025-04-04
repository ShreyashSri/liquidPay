"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface Connection {
  id: number
  name: string
  type: string
  status: string
}

interface NetworkVisualizationProps {
  connections: Connection[]
}

export default function NetworkVisualization({ connections }: NetworkVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove()

    // Create network data
    const nodes = connections.map((conn) => ({
      id: conn.id,
      name: conn.name,
      type: conn.type,
      status: conn.status,
    }))

    // Create links between nodes (for demonstration)
    const links = [
      { source: 1, target: 2 },
      { source: 1, target: 3 },
      { source: 1, target: 5 },
      { source: 2, target: 4 },
      { source: 3, target: 5 },
      { source: 4, target: 6 },
      { source: 5, target: 6 },
    ]

    // Set up SVG
    const width = svgRef.current.clientWidth
    const height = 500

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    // Create simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "network-link")
      .attr("stroke", "rgba(34, 197, 94, 0.3)")
      .attr("stroke-width", 1)

    // Create nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "network-node")
      .attr("r", 8)
      .attr("fill", (d: any) => (d.status === "active" ? "#22c55e" : "#94a3b8"))
      .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add node labels
    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d: any) => d.name)
      .attr("font-size", 10)
      .attr("dx", 12)
      .attr("dy", 4)

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [connections])

  return (
    <div className="w-full h-[500px] border rounded-lg">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}

