USE [sistema]
GO

/****** Object:  Table [dbo].[usuarioWeb]    Script Date: 05/11/2023 18:24:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--drop table usuarioWeb
CREATE TABLE [dbo].[usuarioWeb](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[apellidos] [varchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [text] NOT NULL,
	[rol] [nchar](20) NOT NULL,
	[estado] [bit] NOT NULL,
	[fregistro][varchar](50) NOT NULL
 CONSTRAINT [PK_usuarioWeb] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


select * from usuarioWeb