import React, { useEffect, useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useLocation } from "react-router-dom";

type DemoPageProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

// 路由路径到文件名的映射
const routeToFileMap: Record<string, string> = {
  "/": "Home",
  // 旧页面已拆分
  "/slots/basic": "slots/BasicSlots",
  "/slots/header-overlay": "slots/HeaderOverlaySlots",
  "/slots/footer-actions": "slots/FooterActionsSlots",
  "/advanced/animation-analytics": "advanced/AnimationAnalytics",
  "/advanced/custom-actions": "advanced/CustomActions",
  "/advanced/countdown-promo": "advanced/CountdownPromo",
  "/advanced/all-in-one": "advanced/AllInOne",
  "/layouts/vertical": "layouts/VerticalLayout",
  "/layouts/horizontal": "layouts/HorizontalLayout",
  "/layouts/right-image": "layouts/RightImageLayout",
  "/layouts/bottom-image": "layouts/BottomImageLayout",
  "/layouts/banner": "layouts/BannerLayout",
  "/layouts/grid": "layouts/GridLayout",
  "/layouts/minimal": "layouts/MinimalLayout",
  "/layouts/background": "layouts/BackgroundImageLayout",
  "/layouts/two-column": "layouts/TwoColumnLayout",
  "/compound/basic": "compound/BasicCompound",
  "/compound/enhanced": "compound/PluginEnhancedCompound",
};

// 通过显式的动态导入映射，确保 Vite 能正确打包这些原文件的 raw 文本
const fileLoaderMap: Record<string, () => Promise<{ default: string }>> = {
  Home: () => import("../Home.tsx?raw"),
  // 旧页面已拆分
  "slots/BasicSlots": () => import("../slots/BasicSlots.tsx?raw"),
  "slots/HeaderOverlaySlots": () =>
    import("../slots/HeaderOverlaySlots.tsx?raw"),
  "slots/FooterActionsSlots": () =>
    import("../slots/FooterActionsSlots.tsx?raw"),
  "advanced/AnimationAnalytics": () =>
    import("../advanced/AnimationAnalytics.tsx?raw"),
  "advanced/CustomActions": () => import("../advanced/CustomActions.tsx?raw"),
  "advanced/CountdownPromo": () => import("../advanced/CountdownPromo.tsx?raw"),
  "advanced/AllInOne": () => import("../advanced/AllInOne.tsx?raw"),
  "layouts/VerticalLayout": () => import("../layouts/VerticalLayout.tsx?raw"),
  "layouts/HorizontalLayout": () =>
    import("../layouts/HorizontalLayout.tsx?raw"),
  "layouts/RightImageLayout": () =>
    import("../layouts/RightImageLayout.tsx?raw"),
  "layouts/BottomImageLayout": () =>
    import("../layouts/BottomImageLayout.tsx?raw"),
  "layouts/BannerLayout": () => import("../layouts/BannerLayout.tsx?raw"),
  "layouts/GridLayout": () => import("../layouts/GridLayout.tsx?raw"),
  "layouts/MinimalLayout": () => import("../layouts/MinimalLayout.tsx?raw"),
  "layouts/BackgroundImageLayout": () =>
    import("../layouts/BackgroundImageLayout.tsx?raw"),
  "layouts/TwoColumnLayout": () => import("../layouts/TwoColumnLayout.tsx?raw"),
  "compound/BasicCompound": () => import("../compound/BasicCompound.tsx?raw"),
  "compound/PluginEnhancedCompound": () =>
    import("../compound/PluginEnhancedCompound.tsx?raw"),
};

const DemoPage: React.FC<DemoPageProps> = ({
  title,
  description,
  children,
}) => {
  const location = useLocation();
  const [sourceCode, setSourceCode] = useState<string>("");

  useEffect(() => {
    const loadSourceCode = async () => {
      // 获取当前路由对应的文件名
      const fileName = routeToFileMap[location.pathname];
      if (fileName) {
        try {
          // 使用显式映射，避免变量路径的动态导入在构建阶段无法被静态分析
          const loader = fileLoaderMap[fileName];
          if (loader) {
            const module = await loader();
            setSourceCode(module.default);
          } else {
            setSourceCode("// 源码映射未找到");
          }
        } catch (error) {
          console.error("加载源码失败:", error);
          setSourceCode("// 源码加载失败");
        }
      }
    };

    loadSourceCode();
  }, [location.pathname]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        {description ? <p className="page-desc">{description}</p> : null}
      </div>
      <div className="page-card">{children}</div>

      {sourceCode && (
        <div className="page-card" style={{ marginTop: "20px" }}>
          <h2 style={{ marginBottom: "10px", fontSize: "1.2em" }}>源码</h2>
          <SyntaxHighlighter
            language="tsx"
            style={tomorrow}
            showLineNumbers={true}
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{
              borderRadius: "4px",
              fontSize: "14px",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            {sourceCode}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default DemoPage;
