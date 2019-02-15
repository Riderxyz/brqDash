USE [TFS_Integradora]
GO

/****** Object:  StoredProcedure [dbo].[usp_DashGetWorkItem]    Script Date: 13/12/2018 15:54:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


/*
Autor	-	NILTON CESAR
Data	-	Nov 2018
Descrição
	Esta procedure fornece os dados das demandas de grupos específicos 

*/

CREATE procedure [dbo].[usp_DashGetWorkItem]

as 
begin
/****** Script for SelectTopNRows command from SSMS  ******/

IF OBJECT_ID('tempdb..#Results') IS NOT NULL
    DROP TABLE #Results

SELECT 
case 
	when CHARINDEX('mobile',i.area) <> 0 then UPPER('mobile')
	when CHARINDEX('geradorcodigo',i.area) <> 0 then UPPER('mobile')
	when PATINDEX('%bi%',i.area) = 1 then UPPER('bi')
	when CHARINDEX('pdp\',i.area) <> 0 then UPPER('pdp')
	when CHARINDEX('extranet\',i.area) <> 0 then UPPER('extranet')
	when CHARINDEX('peoplesoft\',i.area) <> 0 then UPPER('peoplesoft')
	when CHARINDEX('portais\',i.area) <> 0 then UPPER('sharepoint')
	else UPPER(i.area)
end as esteira,
case 
	when i.status = 'em analise fornecedor' then
		w.DataFim_SLA_Analise_Calculada
	when i.status = 'em estimativa' then
		w.DataFim_SLA_Dimensionamento_Calculada
	when i.status = 'em estimativa adicional' then
		w.DataFim_SLA_Analise_TFS
	when i.status = 'Em desenvolvimento' then
		w.DataEntrega
	when i.status = 'Dimensionado' then
		w.DataEntrega
	else null
end as datafim,
case 
	when CHARINDEX('mobile',i.area) <> 0 then UPPER('mobile')
	when CHARINDEX('pdp\',i.area) <> 0 then UPPER('pdp')
	when CHARINDEX('extranet\',i.area) <> 0 then UPPER('extranet')
	when CHARINDEX('peoplesoft\',i.area) <> 0 then UPPER('peoplesoft')
	when CHARINDEX('portais\',i.area) <> 0 then UPPER('portais')
	else UPPER(i.area)
end as sistema, 
i.area, CONCAT('TFS-', i.WorkItemID) tfs, i.Severity criticidade, i.TipoDemanda tiposla,
case 
	when i.status = 'em analise fornecedor' then
		[dbo].[FN_Calcular_horas_uteis] (w.StateChangeDate, w.DataFim_SLA_Analise_Calculada,'RJ')
	when i.status = 'em estimativa' then
		[dbo].[FN_Calcular_horas_uteis] (w.StateChangeDate,ISNULL(w.DataEntrega,w.DataFim_SLA_Dimensionamento_Calculada),'RJ')
	when i.status = 'em estimativa adicional' then
		[dbo].[FN_Calcular_horas_uteis] (w.StateChangeDate,w.DataFim_SLA_Analise_TFS,'RJ')
	when i.status = 'Em desenvolvimento' then
		[dbo].[FN_Calcular_horas_uteis] (w.StateChangeDate,w.DataEntrega,'RJ')
	when i.status = 'Dimensionado' then
		[dbo].[FN_Calcular_horas_uteis] (w.StateChangeDate,w.DataEntrega,'RJ')
	when i.status = 'Em analise fornecedor' then
		[dbo].[FN_Calcular_horas_uteis] (w.DataFim_SLA_Analise_Calculada, w.DataFim_SLA_Analise_Calculada,'RJ')
	else UPPER(i.area)
end as data, I.Status status, i.Title titulo into #Results 
FROM Vw_WorkItem i inner join dbo.WorkItem w on w.WorkItemID = i.WorkItemID
where LOWER(i.Status) in ('em analise fornecedor','em estimativa adicional','em estimativa','em desenvolvimento','Dimensionado') and
	case 
		when i.status = 'em analise' then
			w.DataFim_SLA_Analise_TFS
		when i.status = 'em estimativa' then
			IIF ( W.TipoDemanda = 'ANÁLISE DE PROBLEMAS', w.dataentrega, DataFim_SLA_Dimensionamento_Calculada )
		when i.status = 'em estimativa adicional' then
			w.DataFim_SLA_Analise_TFS
		when i.status = 'Em desenvolvimento' then
			w.DataEntrega
		when i.status = 'Dimensionado' then
			w.DataEntrega
		when i.status = 'Em analise fornecedor' then
			w.DataFim_SLA_Analise_Calculada
	end > getdate()


select * from #Results
where data <> '00:00'
order by data , Esteira


end
GO

